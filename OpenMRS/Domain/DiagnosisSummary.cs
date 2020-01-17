using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpenMRS
{
    public class DiagnosisSummary
    {
        public string Diagnosis { get; set; }
        public Int64 Male { get; set; }
        public Int64 Female { get; set; }
        public Int64 Total { get; set; }
    }
}
