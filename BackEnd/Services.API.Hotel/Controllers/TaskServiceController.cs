﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.API.Hotel.Core.Entities;
using Services.API.Hotel.Repository;

namespace Services.API.Hotel.Controllers
{
    // Controller for the Task API
    [Route("api/[controller]")]
    [ApiController]
    public class TaskServiceController : ControllerBase
    {
        private readonly IMongoRepository<TaskEntity> _taskRepository;

        private readonly IMongoRepository<RoomEntity> _roomRepository;

        public TaskServiceController(IMongoRepository<TaskEntity> taskGenericRepository, IMongoRepository<RoomEntity> roomGenericRepository)
        {
            _taskRepository = taskGenericRepository;
            _roomRepository = roomGenericRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskEntity>>> GetAll()
        {
            return Ok(await _taskRepository.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TaskEntity>> GetById(string Id)
        {
            var task = await _taskRepository.GetById(Id);
            if (task == null)
            {
                return NotFound("Esta tarea no existe.");
            }

            return Ok(task);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(TaskEntity task)
        {
            var room = await _roomRepository.GetById(task.Room.Id);
            if (room == null)
            {
                return NotFound("Esta Habitación no existe.");
            }

            await _taskRepository.InsertDocument(task);
            return CreatedAtAction(nameof(GetById), new { id = task.Id }, task);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string Id, TaskEntity newtask)
        {
            var task = await _taskRepository.GetById(Id);
            if (task == null)
            {
                return NotFound("Esta tarea no existe.");
            }

            if (Id != newtask.Id)
            {
                return BadRequest("Los Identificadores no coinciden.");
            }

            if (task.Room.Id != newtask.Room.Id)
            {
                return BadRequest("El id de la habitación no se puede modificar");
            }

            await _taskRepository.UpdateDocument(newtask);
            return CreatedAtAction(nameof(GetById), new { id = newtask.Id }, newtask);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string Id)
        {
            var task = await _taskRepository.GetById(Id);
            if (task == null)
            {
                return NotFound("Esta tarea no existe.");
            }

            await _taskRepository.DeleteById(Id);
            return Ok("Tarea eliminada correctamente.");
        }

        [HttpPost("pagination")]
        public async Task<ActionResult<PaginationDto<TaskEntity>>> Pagination(PaginationDto<TaskEntity> pagination)
        {
            var resultados = await _taskRepository.PaginationBy(pagination);
            return Ok(resultados);
        }
    }
}
