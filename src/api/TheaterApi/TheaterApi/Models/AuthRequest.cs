﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TheaterApi.Models
{
    public class AuthRequest
    {
        public string Email { get; set; }

        public string Password { get; set; }
    }
}
