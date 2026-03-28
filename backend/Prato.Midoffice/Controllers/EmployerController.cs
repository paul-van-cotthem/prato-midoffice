using Microsoft.AspNetCore.Mvc;
using Prato.Midoffice.Data;
using Prato.Midoffice.Models;

namespace Prato.Midoffice.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployerController : ControllerBase
    {
        private readonly IEmployerRepository _employerRepository;

        public EmployerController(IEmployerRepository employerRepository)
        {
            _employerRepository = employerRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employer>>> GetAll()
        {
            var employers = await _employerRepository.GetAllAsync();
            return Ok(employers);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employer>> GetById(Guid id)
        {
            var employer = await _employerRepository.GetByIdAsync(id);
            if (employer == null) return NotFound();
            return Ok(employer);
        }
    }
}
