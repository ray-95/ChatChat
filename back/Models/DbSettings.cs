namespace chat.Models {
    public interface IDbSettings {
        string ConnectionString { get; set; }

        string DatabaseName { get; set; }
    }

    public class DbSettings : IDbSettings {
        public string ConnectionString { get; set; }

        public string DatabaseName { get; set; }
    }
}