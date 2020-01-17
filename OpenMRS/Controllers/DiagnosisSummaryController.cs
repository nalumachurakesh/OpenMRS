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
    public class DiagnosisSummaryController : ControllerBase
    {
        private readonly string connectionString = @"Data Source = .\Database\openmrs.db;Version=3; FailIfMissing=True; Foreign Keys = True;";

        private readonly ILogger<DiagnosisSummaryController> _logger;

        public DiagnosisSummaryController(ILogger<DiagnosisSummaryController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<DiagnosisSummary> Get()
        {
            List<DiagnosisSummary> diagnosisSummaryList = new List<DiagnosisSummary>();

            using (SQLiteConnection conn = new SQLiteConnection(connectionString))
            {
                conn.Open();

                string sql = @"select
                               d.name as Diagnosis, 
                               count(case when p.gender = 'M' then gender end) as Male,
                               count(case when p.gender = 'F' then gender end) as Female,
                               count(gender) as Total
                               from patient p
                               join encounter e on e.patient_id = p.id
                               join encounter_diagnosis ed on ed.encounter_id = e.id
                               join diagnosis d on d.id = ed.diagnosis_id
                               group by d.name
                               order by Total desc limit 10";

                using (SQLiteCommand cmd = new SQLiteCommand(sql, conn))
                {
                    using (SQLiteDataAdapter sda = new SQLiteDataAdapter())
                    {
                        sda.SelectCommand = cmd;

                        using (DataTable dt = new DataTable())
                        {
                            sda.Fill(dt);

                            diagnosisSummaryList = Generics.ConvertDataTable<DiagnosisSummary>(dt);
                        }
                    }
                }
                conn.Close();
            }
            return diagnosisSummaryList;
        }
    }
}