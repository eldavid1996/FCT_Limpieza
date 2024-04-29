using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Services.API.Security.Core.Dto;
using Services.API.Security.Core.Entities;
using Services.API.Security.Core.Persistence;

namespace Services.API.Security.Core.Application
{
    // Business logic
    // Insert User
    public class RegisterUpdate
    {
        public class UserRegisterCommand : IRequest<RegisteredUserDto>
        {
            // Identity properties
            public string? Id { get; set; } // Exists, but is null when we create one new user
            public string? Username { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }

            public string PhoneNumber { get; set; }

            // User properties
            public string Name { get; set; }
            public string Surname { get; set; }
            public bool RoleAdmin { get; set; }

            // Optional User properties for register
            public DateTime? BirthDate { get; set; }
            public string? City { get; set; }
            public string? CP { get; set; }
        }

        public class UserRegisterHandler : IRequestHandler<UserRegisterCommand, RegisteredUserDto>
        {
            private readonly SQLServerContext _context;
            private readonly UserManager<UserEntity> _userManager;
            private readonly IMapper _mapper;

            public UserRegisterHandler(SQLServerContext context, UserManager<UserEntity> userManager, IMapper mapper)
            {
                _context = context;
                _userManager = userManager;
                _mapper = mapper;
            }

            public async Task<RegisteredUserDto> Handle(UserRegisterCommand request, CancellationToken cancellationToken)
            {
                var exists = await _context.Users.Where(x => x.Email == request.Email).AnyAsync();
                if (exists)
                {
                    throw new Exception("El Email del usuario ya existe en la base de datos");
                }

                exists = await _context.Users.Where(x => x.UserName == request.Username).AnyAsync();
                if (exists)
                {
                    throw new Exception("El UserName del usuario ya existe en la base de datos");
                }

                var user = new UserEntity
                {
                    UserName = request.Email, // In this case, Username will be the email too
                    Email = request.Email,
                    PhoneNumber = request.PhoneNumber,
                    Name = request.Name,
                    Surname = request.Surname,
                    RoleAdmin = request.RoleAdmin,
                    BirthDate = request.BirthDate,
                    City = request.City,
                    CP = request.CP
                };

                var result = await _userManager.CreateAsync(user, request.Password);


                if (result.Succeeded)
                {
                    var registeredUserDto = _mapper.Map<UserEntity, RegisteredUserDto>(user);
                    return registeredUserDto;
                }
                throw new Exception("No se pudo registrar el usuario");

            }
        }

        // Update
        public class UserUpdateCommand : IRequest<RegisteredUserDto>
        {
            // url id
            public string? idUser { get; set; }

            // Identity properties
            public string? Id { get; set; } // Exists, but is null when we create one new user
            public string? Username { get; set; }
            public string? Email { get; set; }
            public string? Password { get; set; }

            public string? PhoneNumber { get; set; }

            // User properties
            public string? Name { get; set; }
            public string? Surname { get; set; }
            public bool? RoleAdmin { get; set; } = false;

            // Optional User properties for register
            public DateTime? BirthDate { get; set; }
            public string? City { get; set; }
            public string? CP { get; set; }
        }

        public class UserUpdateHandler : IRequestHandler<UserUpdateCommand, RegisteredUserDto>
        {
            private readonly SQLServerContext _context;
            private readonly UserManager<UserEntity> _userManager;
            private readonly IMapper _mapper;

            public UserUpdateHandler(SQLServerContext context, UserManager<UserEntity> userManager, IMapper mapper)
            {
                _context = context;
                _userManager = userManager;
                _mapper = mapper;
            }

            public async Task<RegisteredUserDto> Handle(UserUpdateCommand request, CancellationToken cancellationToken)
            {
                var exists = await _context.Users.Where(x => x.Id == request.idUser).AnyAsync();
                var same = request.Id == request.idUser;

                if (!exists)
                {
                    throw new Exception("El Id del usuario no existe en la base de datos.");
                }

                if (!same)
                {
                    throw new Exception("El Id del usuario y el de la URL no coinciden.");
                }

                var registeredUser = await _context.Users.Where(x => x.Id == request.Id).FirstAsync();

                registeredUser.Id = request.Id;
                registeredUser.UserName = request.Email;
                registeredUser.Email = request.Email;
                registeredUser.PhoneNumber = request.PhoneNumber;
                registeredUser.Name = request.Name;
                registeredUser.Surname = request.Surname;
                registeredUser.RoleAdmin = (bool)request.RoleAdmin;
                registeredUser.BirthDate = request.BirthDate;
                registeredUser.City = request.City;
                registeredUser.CP = request.CP;

                var result = await _userManager.UpdateAsync(registeredUser);

                if (result.Succeeded)
                {
                    var registeredUserDto = _mapper.Map<UserEntity, RegisteredUserDto>(registeredUser);
                    return registeredUserDto;
                }
                throw new Exception("No se pudo actualizar el usuario");
            }
        }
    }
}
