using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpenMRS
{
    public class EncounterSummary
    {
        public string Description { get; set; }
        public Int64 Male { get; set; }
        public Int64 Female { get; set; }
        public Int64 Total { get; set; }
    }
}
