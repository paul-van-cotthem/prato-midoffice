using Microsoft.AspNetCore.Mvc;
using Prato.Midoffice.Data;
using Prato.Midoffice.Models;
using Prato.Midoffice.Services;

namespace Prato.Midoffice.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonController : ControllerBase
    {
        private readonly IPersonRepository _personRepository;
        private readonly IValidationService _validationService;

        public PersonController(IPersonRepository personRepository, IValidationService validationService)
        {
            _personRepository = personRepository;
            _validationService = validationService;
        }

        [HttpGet("employer/{employerId}")]
        public async Task<ActionResult<IEnumerable<PersoonSnapshot>>> GetByEmployer(Guid employerId)
        {
            var snapshots = await _personRepository.GetLatestSnapshotsByEmployerAsync(employerId);
            return Ok(snapshots);
        }

        [HttpPost("{personId}/snapshot")]
        public async Task<ActionResult> AddSnapshot(Guid personId, [FromBody] PersoonSnapshot snapshot)
        {
            var validation = _validationService.ValidateSnapshot(snapshot);
            if (!validation.IsValid)
            {
                return BadRequest(new { Message = validation.Message });
            }

            try 
            {
                var snapshotId = await _personRepository.AddSnapshotAsync(personId, snapshot);
                return CreatedAtAction(nameof(GetByEmployer), new { id = snapshotId }, snapshot);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Onmogelijk om snapshot toe te voegen (mogelijke overlap)", Detail = ex.Message });
            }
        }

        [HttpPost("employer/{employerId}/new")]
        public async Task<ActionResult<Guid>> CreatePerson(Guid employerId)
        {
            var personId = await _personRepository.CreatePersonAsync(employerId);
            return Ok(personId);
        }
    }
}
