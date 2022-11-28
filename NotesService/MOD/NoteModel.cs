using System.ComponentModel.DataAnnotations;

namespace Notes.MOD
{
    public class NoteModel
    {
        public int? Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}
