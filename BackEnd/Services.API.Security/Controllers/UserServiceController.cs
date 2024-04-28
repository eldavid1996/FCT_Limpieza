using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services.API.Security.Core.Application;
using Services.API.Security.Core.Dto;
using Services.API.Security.Core.Entities;
using Services.API.Security.Core.Persistence;
using System.Security.Claims;

// Controller for the Security API
namespace Services.API.Security.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserServiceController : ControllerBase
    {
        private readonly IMediator _mediator;

        private readonly SQLServerContext _context;
        private readonly IMapper _mapper;

        private readonly UserManager<UserEntity> _userManager;


        public UserServiceController(IMediator mediator, SQLServerContext context, IMapper mapper, UserManager<UserEntity> userManager)
        {
            _mediator = mediator;
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<List<RegisteredUserDto>>> GetAll()
        {
            var usersEntities = await _context.Users.ToListAsync();
            var registeredUsersDto = _mapper.Map<List<UserEntity>, List<RegisteredUserDto>>(usersEntities);
            return Ok(registeredUsersDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RegisteredUserDto>> GetById(string Id)
        {
            var userEntity = await _context.Users.FindAsync(Id);
            if (userEntity == null)
            {
                return NotFound("El usuario no existe.");
            }
            var registeredUserDto = _mapper.Map<UserEntity, RegisteredUserDto>(userEntity);
            return Ok(registeredUserDto);
        }

        [HttpPost]
        public async Task<ActionResult<RegisteredUserDto>> Insert(RegisterUpdate.UserRegisterCommand options)
        {
            return await _mediator.Send(options);
        }

        [HttpPut("{idUser}")]
        public async Task<ActionResult<RegisteredUserDto>> Update(string idUser, RegisterUpdate.UserUpdateCommand options)
        {
            options.idUser = idUser;
            return await _mediator.Send(options);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string Id)
        {
            var user = await _userManager.FindByIdAsync(Id);

            if (user == null)
            {
                return NotFound("El usuario no existe.");
            }

            var result = await _userManager.DeleteAsync(user);

            if (result.Succeeded)
            {
                return Ok("Usuario eliminado correctamente");
            }

            return StatusCode(StatusCodes.Status500InternalServerError, "No se pudo eliminar el usuario.");

        }

        [HttpPost("pagination")]
        public async Task<ActionResult<UsersFilteredDto>> Pagination([FromBody] UsersFilteredDto parameters)
        {
            IQueryable<UserEntity> query = _context.Users;

            var filter = parameters.Filter;

            if (filter != null)
            {
                query = query.Where(
                    u => u.Name.Contains(parameters.Filter.Value) ||
                    u.Email.Contains(parameters.Filter.Value) ||
                    u.City.Contains(parameters.Filter.Value)
                    );
            }

            var usersEntities = await query
                .Skip((parameters.Page - 1) * parameters.PageSize)
                .Take(parameters.PageSize)
                .ToListAsync();

            parameters.TotalRows = usersEntities.Count;

            var registeredUsersDto = _mapper.Map<List<UserEntity>, List<RegisteredUserDto>>(usersEntities);

            parameters.Data = registeredUsersDto;

            var rounded = Math.Ceiling(usersEntities.Count / Convert.ToDecimal(parameters.PageSize));
            var totalPages = Convert.ToInt32(rounded);

            parameters.PagesQuantity = totalPages;

            return Ok(parameters);
        }

        // Logged in user, not work yet (need token)
        [HttpPost("updatePassword")]
        public async Task<IActionResult> UpdatePassword([FromBody] updatePasswordDto updatePasswordModel)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound("Usuario no encontrado");
            }

            var passwordCheck = await _userManager.CheckPasswordAsync(user, updatePasswordModel.oldPassword);
            if (!passwordCheck)
            {
                return BadRequest("La contraseña es incorrecta");
            }

            var result = await _userManager.ChangePasswordAsync(user, updatePasswordModel.oldPassword, updatePasswordModel.newPassword);
            if (!result.Succeeded)
            {
                return BadRequest("No se pudo cambiar la contraseña");
            }

            return Ok("Contraseña cambiada exitosamente");
        }
    }
}
