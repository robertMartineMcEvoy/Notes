using Microsoft.AspNetCore.Mvc;
using Notes.MOD;
using Notes.DAL;

namespace NotesService.API
{
    [ApiController]
    [Route("api/[controller]")]
    public class NoteController : ControllerBase
    {
        NotesDAL dal = new NotesDAL();

        [HttpGet]
        public ActionResult<IEnumerable<NoteModel>> GetNotes()
        {
            var allNotes = new List<NoteModel>();
            try
            {
                return dal.GetAllNotes();
            }
            catch (Exception ex)
            {
                return Problem("\"Error Retrieving All Notes.\"");
            }
        }

        [HttpGet("{id}", Name = "GetNote")]
        public ActionResult<NoteModel?> GetNote(int id)
        {
            NoteModel? returnNote = new NoteModel();
            try
            {
                returnNote = dal.GetNote(id);
            }
            catch (Exception ex)
            {
                return Problem("\"Error Retrieving Note.\"");
            }

            if (returnNote is null)
            {
                return NotFound("\"Note Not Found.\"");
;           }
            else 
            { 
                return returnNote;
            }
        }

        [HttpPost]
        public ActionResult<NoteModel> CreateNote(NoteModel note)
        {
            try
            {
                dal.CreateNote(note);
            }
            catch 
            {
                return Problem("\"Error Creating Note.\"");
            }

            return Ok("\"Note Created.\"");
        }

        [HttpPut]
        public ActionResult<NoteModel> UpdateNote(NoteModel note)
        {
            try
            {
                dal.UpdateNote(note);
            }
            catch
            {
                return Problem("\"Error Updating Note.\"");
            }

            return Ok("\"Note Updated.\"");
        }

        [HttpDelete]
        public ActionResult<NoteModel> DeleteNote(int id)
        {
            try
            {
                dal.DeleteNote(id);
            }
            catch
            {
                return Problem("\"Error Deleting Note.\"");
            }

            return Ok("\"Note Deleted.\"");
        }
    }
}