using Dapper;
using Microsoft.Data.Sqlite;
using Notes.MOD;

namespace Notes.DAL
{
    public class NotesDAL
    {
        private const string defaultSqliteConnectionString = @"Data Source =./Data/NotesDB.DB";

        private string SqliteConnectionString;

        public NotesDAL():this(defaultSqliteConnectionString)
        { }

        public NotesDAL(string sqliteConnectionString)
        {
            SqliteConnectionString = sqliteConnectionString;
        }

        public List<NoteModel> GetAllNotes()
        {
            List<NoteModel> notes = new List<NoteModel>();

            try
            {
                using (var connection = new SqliteConnection(SqliteConnectionString))
                {
                    notes = connection.Query<NoteModel>("Select Id, Title, Content from Notes").ToList();
                    connection.Close();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error Trying to Reteive All Notes:{0}", ex.Message);
                throw;
            }

            return notes;
        }

        public NoteModel? GetNote(int NoteId)
        {
            NoteModel? returnNote = new NoteModel();

            try
            {
                using (var connection = new SqliteConnection(SqliteConnectionString))
                {
                    returnNote = connection.Query<NoteModel>(@"SELECT Id, Title, Content FROM Notes WHERE Id=@Id;", new { Id = NoteId }).FirstOrDefault();
                    connection.Close();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error Trying to Retrieve Note Id {0}:{1}", NoteId, ex.Message);
                throw;
            }

            return returnNote;
        }

        public bool CreateNote(NoteModel note)
        {
            bool success = false;

            try
            {
                var rowsAffected = 0;

                using (var connection = new SqliteConnection(SqliteConnectionString))
                {
                    rowsAffected = connection.Execute("INSERT INTO Notes (Title, Content) VALUES(@Title, @Content);", note);
                    connection.Close();
                    success = rowsAffected != 0;
                }

                if (rowsAffected == 0)
                {
                    throw new Exception("Note was not Created.");
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Error Trying to Create Note: {0}", ex.Message);
                throw;
            }

            return success;
        }

        public bool UpdateNote(NoteModel note)
        {
            bool success = false;

            try
            {
                var rowsAffected = 0;

                using (var connection = new SqliteConnection(SqliteConnectionString))
                {
                    rowsAffected = connection.Execute("UPDATE NOTES SET Title = @Title, Content=@Content WHERE Id = @Id", note);
                    connection.Close();
                    success = rowsAffected != 0;
                }

                if (rowsAffected == 0)
                {
                    throw new Exception("Note was not Updated.");
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Error Trying to Update Note Id {0}: {1}", note.Id, ex.Message);
                throw;
            }

            return success;
        }

        public bool DeleteNote(int noteIdToDelete)
        {
            bool success = false;

            try
            {
                var rowsAffected = 0;

                using (var connection = new SqliteConnection(SqliteConnectionString))
                {
                    rowsAffected = connection.Execute("DELETE FROM NOTES WHERE Id = @Id;", new { Id = noteIdToDelete });
                    connection.Close();
                    success = rowsAffected != 0;
                }

                if (rowsAffected == 0)
                {
                    throw new Exception("Note was not Deleted.");
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Error Trying to Delete Note Id {0}: {1}", noteIdToDelete, ex.Message);
                throw;
            }

            return success;
        }
    }
}
