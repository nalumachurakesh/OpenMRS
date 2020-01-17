using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SQLite;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace OpenMRS.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EncounterSummaryController : ControllerBase
    {
        private readonly string connectionString = @"Data Source = .\Database\openmrs.db;Version=3; FailIfMissing=True; Foreign Keys = True;";

        private readonly ILogger<EncounterSummaryController> _logger;

        public EncounterSummaryController(ILogger<EncounterSummaryController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<EncounterSummary> Get()
        {
            List<EncounterSummary> encounterSummaryList = new List<EncounterSummary>();

            using (SQLiteConnection conn = new SQLiteConnection(connectionString))
            {
                conn.Open();

                string sql = @"select 
                               e.description as Description, 
                               count(case when p.gender = 'M' then gender end) as Male,
                               count(case when p.gender = 'F' then gender end) as Female,
                               count(gender) as Total
                               from patient p
                               join encounter e on e.patient_id = p.id                               
                               group by e.description";

                using (SQLiteCommand cmd = new SQLiteCommand(sql, conn))
                {
                    using (SQLiteDataAdapter sda = new SQLiteDataAdapter())
                    {
                        sda.SelectCommand = cmd;

                        using (DataTable dt = new DataTable())
                        {
                            sda.Fill(dt);

                            encounterSummaryList = Generics.ConvertDataTable<EncounterSummary>(dt);
                        }
                    }
                }
                conn.Close();
            }
            return encounterSummaryList;
        }
    }
}