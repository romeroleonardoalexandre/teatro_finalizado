import * as AdminAreas from "../admin/AdminAreas"

export default () => {
    return {
      session: [
        {
          id: "1",
          title: "oi",
          session: "01/03 - 01:00",
          tickets: "99"
        },{
          id: "2",
          title: "olá",
          session: "02/03 - 02:00",
          tickets: "99"
        },{
          id: "3",
          title: "hello",
          session: "03/03 - 03:00",
          tickets: "99"
        },{
          id: "4",
          title: "bonjou",
          session: "04/03 - 04:00",
          tickets: "99"
        }
      ],
      sessions: {
        ["1"]: {
          id: "1",
          title: "oi",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          hour: "01:00",
          date: "01/03",
          avaiableTickets: "99"
        },
        ["2"]: {
          id: "2",
          title: "olá",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          hour: "02:00",
          date: "02/03",
          avaiableTickets: "99"
        },
        ["3"]: {
          id: "3",
          title: "hello",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          hour: "03:00",
          date: "03/03",
          avaiableTickets: "99"
        },
        ["4"]: {
          id: "4",
          title: "bonjou",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          hour: "04:00",
          date: "04/03",
          avaiableTickets: "99"
        }
      },
      [AdminAreas.SHOWS]: {
        ["1"] : {
          title: "oi",
          id: 1,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          room: "A1",
          sessions: [{
            date: "25/05/1998",
            hour: "24:24",
          },{
            date: "25/05/1998",
            hour: "24:24",
          },{
            date: "25/05/1998",
            hour: "24:24",
          },],
          tickets: {}
        },
        ["2"] : {
          title: "olá",
          id: 2,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          room: "B3",
          sessions: [{
            date: "25/05/1998",
            hour: "24:24",
          },{
            date: "25/05/1998",
            hour: "24:24",
          },{
            date: "25/05/1998",
            hour: "24:24",
          },],
          tickets: {}
        },
        ["3"] : {
          title: "hello",
          id: 3,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          room: "A3",
          sessions: [{
            date: "25/05/1998",
            hour: "24:24",
          }],
          tickets: {}
        },
        ["4"] : {
          title: "bonjou",
          id: 4,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          room: "A4",
          sessions: [{
            date: "25/05/1998",
            hour: "24:24",
          },{
            date: "25/05/1998",
            hour: "24:24",
          },{
            date: "25/05/1998",
            hour: "24:24",
          },{
            date: "25/05/1998",
            hour: "24:24",
          },{
            date: "25/05/1998",
            hour: "24:24",
          },{
            date: "25/05/1998",
            hour: "24:24",
          },],
          tickets: {}
        }
      },
      [AdminAreas.TRUPES]: {
        ["1"] : {
          title: "heheeh",
          id: 1,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          shows: ["1","2","3"]
        },
        ["2"] : {
          title: "hello",
          id: 2,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          shows: ["1","2","3"]
        },
        ["3"] : {
          title: "hello",
          id: 3,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          shows: ["1","2","3"]
        },
        ["4"] : {
          title: "hello",
          id: 4,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          shows: ["1","2","3"]
        },
        ["5"] : {
          title: "hello",
          id: 5,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          shows: ["1","2","3"]
        },
        ["6"] : {
          title: "hello",
          id: 6,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          shows: ["1","2","3"]
        },
        ["7"] : {
          title: "hello",
          id: 7,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          shows: ["1","2","3"]
        },
        ["8"] : {
          title: "hello",
          id: 8,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          shows: ["1","2","3"]
        },
        ["9"] : {
          title: "hello",
          id: 9,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          shows: ["1","2","3"]
        },
        ["10"] : {
          title: "hello",
          id: 10,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          shows: ["1","2","3"]
        },
        ["11"] : {
          title: "hello",
          id: 11,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          shows: ["1","2","3"]
        },
        ["12"] : {
          title: "hello",
          id: 12,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          shows: ["1","2","3"]
        },
        ["13"] : {
          title: "hello",
          id: 13,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          shows: ["1","2","3"]
        },
        ["14"] : {
          title: "hello",
          id: 14,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          shows: ["1","2","3"]
        }
      },
      [AdminAreas.USERS]: {
        ["1"] : {
          title: "YAYAYA"
        },
        ["2"] : {
          title: "UYGYU"
        },
        ["3"] : {
          title: "YONLKJNKLJAYAYA"
        },
        ["4"] : {
          title: "YAYKLJNKLJNAYA"
        },
        ["5"] : {
          title: "KJNLKJNYITDURDUTYAYAYA"
        },
        ["6"] : {
          title: "YAYAKLJHIHOIHOIYA"
        },
        ["7"] : {
          title: "YHOIHOUIYFITUYTDFUYTDIUTDOUTDTRSUTTEOUYRFTYUSDEIYDTKTHYAYA"
        },
        ["8"] : {
          title: "YJJJJJJJAYAYA"
        },
        ["9"] : {
          title: "YKJNKJAYAYA"
        },
        ["10"] : {
          title: "YAKJNKJNKJNAYA"
        },
        ["11"] : {
          title: "YAKJNPIFGUTFYUTFYTCDUYRTSDIYGLIUGKUYGYAYA"
        },
        ["12"] : {
          title: "YAYIUHOIUBUYHVGUIYRFOYGUAYA"
        },
        ["13"] : {
          title: "YUYGFIUYFIUTYFIUTYFTYAYAYA"
        },
        ["14"] : {
          title: "YAYITFURTDTYURIUYRFIUYFUYAYA"
        },
        ["15"] : {
          title: "YAKJNKJNKJNAYA"
        },
        ["16"] : {
          title: "YAKJNPIFGUTFYUTFYTCDUYRTSDIYGLIUGKUYGYAYA"
        },
        ["17"] : {
          title: "YAYIUHOIUBUYHVGUIYRFOYGUAYA"
        },
        ["18"] : {
          title: "YUYGFIUYFIUTYFIUTYFTYAYAYA"
        },
        ["19"] : {
          title: "YAYITFURTDTYURIUYRFIUYFUYAYA"
        }
      },
      [AdminAreas.ROOMS]: {
        ["1"] : {
          id: 1,
          title: "Premium",
          map: {},
          seatsQnty: 50,
          tickets: {}
        },
        ["2"] : {
          id: 2,
          title: "Esquerda",
          map: {},
          seatsQnty: 50,
          tickets: {}
        },
        ["3"] : {
          id: 3,
          title: "Direita",
          map: {},
          seatsQnty: 50,
          tickets: {}
        },
        ["4"] : {
          id: 4,
          title: "Centro",
          map: {},
          seatsQnty: 50,
          tickets: {}
        },
        ["5"] : {
          id: 5,
          title: "Blabla",
          map: {},
          seatsQnty: 50,
          tickets: {}
        },
        ["6"] : {
          id: 6,
          title: "Bounjour",
          map: {},
          seatsQnty: 50,
          tickets: {}
        }
      }
    }
}
