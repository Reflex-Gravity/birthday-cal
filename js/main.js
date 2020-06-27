function Calendar() {
    const dayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
    const WEEK_DATA = { mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] }
    const parentSquareSide = 160

    this.init = function () {
        this.registerListeners()
        this.getValues()
    }

    this.registerListeners = function () {
        const btn = document.getElementById("update-btn")
        btn.addEventListener("click", () => {
            this.getValues()
        })
    }

    this.getValues = function () {
        const year = document.getElementById("year_field").value
        const rawData = document.getElementById("data_field").value
        let data = []
        try {
            if (rawData) {
                data = JSON.parse(rawData)
            } else {
                data = []
            }
        } catch (er) {
            this.throwError("Input data is invalid!")
        }

        this.calculateData(data, year)
    }

    this.calculateData = function (data, year) {
        let weekData = WEEK_DATA

        data.forEach((person) => {
            if (person && person.name && person.birthday) {
                try {
                    const day = new Date(person.birthday).getDay()
                    const bdayYear = new Date(person.birthday).getFullYear()
                    if ((!isNaN(day) && typeof day === "number") || (year && bdayYear === year)) {
                        weekData = {
                            ...weekData,
                            [dayOfWeek[day]]: [...this.sortDay([...weekData[dayOfWeek[day]], { ...person }])],
                        }
                    }
                } catch (er) {}
            }
        })

        this.renderApp(weekData)
    }

    this.renderApp = function(weekData) {
        console.log(weekData)
    }

    this.sortDay = function (dayData) {
        return dayData.sort((a, b) => new Date(a.birthday) - new Date(b.birthday))
    }

    /**
     * Show an error message.
     *
     * @param {string} msg
     */
    this.throwError = function (msg) {
        const errorEl = document.getElementById("error-msg")
        errorEl.innerText = `Error: ${msg}`
    }
}

const daat = [
    { name: "Spence Mendoza", birthday: "01/17/2006" },
    { name: "Shirley Wong", birthday: "06/17/1980" },
    { name: "Pate Mcintyre", birthday: "09/06/1996" },
    { name: "Blair Gonzalez", birthday: "01/04/1998" },
    { name: "Tonia Rowland", birthday: "07/15/1963" },
    { name: "Morales Holder", birthday: "06/14/1961" },
    { name: "Sawyer Avery", birthday: "09/16/2019" },
    { name: "Florence Velasquez", birthday: "09/04/1978" },
    { name: "Larsen Parrish", birthday: "01/21/1967" },
    { name: "Matthews Whitney", birthday: "06/19/1966" },
    { name: "Sellers Day", birthday: "10/24/1960" },
    { name: "Ann Gardner", birthday: "03/03/2009" },
    { name: "Moore Odom", birthday: "11/23/2016" },
    { name: "Vickie Downs", birthday: "12/26/2009" },
    { name: "Nolan Stanley", birthday: "09/24/1960" },
    { name: "Terri King", birthday: "04/06/1992" },
    { name: "Christy Spencer", birthday: "02/19/1991" },
    { name: "Alvarez Mclaughlin", birthday: "04/21/1971" },
    { name: "Jenna Vaughn", birthday: "07/04/1992" },
    { name: "Phyllis Hurst", birthday: "03/24/1962" },
    { name: "Mullen Clarke", birthday: "03/02/1982" },
    { name: "Helga Beach", birthday: "06/30/2006" },
    { name: "Stacey Garrison", birthday: "12/14/1989" },
    { name: "Sue Torres", birthday: "06/07/1985" },
    { name: "Atkinson Ford", birthday: "05/19/1991" },
    { name: "Shana Albert", birthday: "03/02/1998" },
    { name: "Heath Petersen", birthday: "03/02/1962" },
    { name: "Day Bond", birthday: "07/07/1961" },
    { name: "Dyer Arnold", birthday: "04/17/1987" },
    { name: "Sabrina Good", birthday: "08/15/2014" },
    { name: "Kline Dickerson", birthday: "06/23/1981" },
    { name: "Imogene Williams", birthday: "12/07/1997" },
    { name: "Trevino French", birthday: "07/04/1984" },
    { name: "Pitts Fields", birthday: "11/29/2010" },
    { name: "Dona Hickman", birthday: "05/24/1976" },
    { name: "Marva Carson", birthday: "03/30/1994" },
    { name: "Cassie Burke", birthday: "07/18/1982" },
    { name: "Janet Evans", birthday: "04/16/2017" },
    { name: "Berta Acevedo", birthday: "08/10/1985" },
    { name: "Eve Moody", birthday: "03/06/1976" },
    { name: "Tommie Richards", birthday: "07/26/1965" },
    { name: "Elvira Cash", birthday: "09/13/2004" },
    { name: "Anne Tanner", birthday: "08/31/1979" },
    { name: "Sexton Butler", birthday: "06/20/2018" },
    { name: "Shannon Becker", birthday: "07/22/1977" },
    { name: "Violet Kirk", birthday: "07/09/1981" },
    { name: "Nichols Townsend", birthday: "09/05/2014" },
    { name: "Judy Padilla", birthday: "04/14/1984" },
    { name: "Clay Cervantes", birthday: "04/13/2007" },
    { name: "Mia Lee", birthday: "02/25/1965" },
    { name: "Kaufman Charles", birthday: "10/02/1974" },
    { name: "Martinez Barker", birthday: "03/10/1984" },
    { name: "Howell White", birthday: "09/04/2016" },
    { name: "Dickson Little", birthday: "07/28/2017" },
    { name: "Mercedes Casey", birthday: "12/01/1963" },
    { name: "Moreno Nguyen", birthday: "09/04/1964" },
    { name: "Kris Walters", birthday: "11/13/1972" },
    { name: "Silvia Potts", birthday: "11/07/1960" },
    { name: "Sybil Cameron", birthday: "02/27/1995" },
    { name: "Tamra Mccoy", birthday: "02/05/2015" },
]

document.getElementById("data_field").value = JSON.stringify(daat)

let calendar = new Calendar()

calendar.init()
