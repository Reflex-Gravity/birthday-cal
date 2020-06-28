function Calendar() {
    const dayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
    const WEEK_DATA = { mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] }
    const parentSquareSide = 160
    this.prevRawData = ""
    this.prevYear = ''

    this.init = function () {
        this.registerListeners()
        this.retrieveValues()
    }

    this.registerListeners = function () {
        const btn = document.getElementById("update-btn")
        btn.addEventListener("click", () => {
            this.retrieveValues()
        })

        const calForm = document.getElementById('cal_form')
        calForm.addEventListener('submit', evt => {
            evt.preventDefault()
            this.retrieveValues()
        })
    }
    
    /**
     * 
     *
     */
    this.retrieveValues = function () {

        // Reset UI
        this.throwError("")
        
        const year = document.getElementById("year_field").value
        const rawData = document.getElementById("data_field").value
        let data = []
        try {
            if (rawData) {
                data = JSON.parse(rawData)

                if(!Array.isArray(data)) {
                    throw new Error('Array expected')
                }

            } else {
                data = []
            }
        } catch (er) {
            this.throwError("Input data is invalid!")
        }

        // Re-render only if inputs are changed.
        if (this.prevRawData !== rawData || this.prevYear !== year) {
            this.prevRawData = rawData
            this.prevYear = year

            this.calculateData(data, year)
        }
    }

    this.calculateData = function (data, year) {
        let weekData = WEEK_DATA

        data.forEach((person) => {
            if (person && person.name && person.birthday) {
                try {
                    const day = new Date(person.birthday).getDay()
                    const bdayYear = new Date(person.birthday).getFullYear()

                    if (year && String(bdayYear) !== year) {
                        return
                    }

                    if (!isNaN(day) && typeof day === "number") {
                        weekData = {
                            ...weekData,
                            [dayOfWeek[day]]: [...this.sortDay([...weekData[dayOfWeek[day]], { ...person }])],
                        }
                    }
                } catch (er) {
                    console.log(er)
                    return
                }
            }
        })

        this.renderApp(weekData)
    }

    this.renderApp = function (weekData) {
        let weekEl = ""
        for (const day in weekData) {
            if (weekData.hasOwnProperty(day)) {
                const dayData = weekData[day]

                if (Array.isArray(dayData)) {
                    weekEl += `<div class="cal__day ${dayData.length === 0 ? "day--empty" : ""}">
                                    <div class="cal__day_header">${day}</div>
                                    <div class="cal__day_content">
                                        ${this.renderBdayCard(dayData)}
                                    </div>
                                </div>`
                }
            }
        }

        document.getElementById("weekly").innerHTML = weekEl
    }

    this.renderBdayCard = function (dayData) {
        const grid = Math.ceil(Math.sqrt(dayData.length))
        let dayCards = ""
        const cardWidth = parseFloat(parentSquareSide / grid).toFixed('5');
        const fontSize = cardWidth <= 25 ? `${parseInt(cardWidth/1.8)}px` : 'inherit'

        dayData.forEach((person) => {
            dayCards += `<div class="day__person" title='${person.birthday}' style="background-color: ${this.generateColor()}; width: ${cardWidth}px; height:${cardWidth}px; font-size:${fontSize}">
                ${this.getInitials(person.name)}
            </div>`
        })

        return dayCards
    }

    /**
     *  Returns the initials from a string.
     *
     * @param {string} [fullName='']
     * @returns
     */
    this.getInitials = function (fullName = "") {
        if (!fullName) return ""

        fullName = String(fullName)

        if (fullName.indexOf(" ")) {
            return `${fullName[0]}${fullName[fullName.indexOf(" ") + 1]}`
        }

        return name[0]
    }

    /**
     * Generates random colors.
     *
     * @returns
     */
    this.generateColor = function () {
        var lum = -0.25
        var hex = String("#" + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, "")
        if (hex.length < 6) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
        }
        var rgb = "#",
            c,
            i
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i * 2, 2), 16)
            c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16)
            rgb += ("00" + c).substr(c.length)
        }
        return rgb
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
        if(msg) {
            errorEl.innerText = `Error: ${msg}`
        } else {
            errorEl.innerText = ``
        }
    }
}

const daat = [{"name":"Spence Mendoza","birthday":"01/17/2006"},{"name":"Shirley Wong","birthday":"06/17/1980"},{"name":"Pate Mcintyre","birthday":"09/06/1996"},{"name":"Blair Gonzalez","birthday":"01/04/1998"},{"name":"Tonia Rowland","birthday":"07/15/1963"},{"name":"Morales Holder","birthday":"06/14/1961"},{"name":"Sawyer Avery","birthday":"09/16/2019"},{"name":"Florence Velasquez","birthday":"09/04/1978"},{"name":"Larsen Parrish","birthday":"01/21/1967"},{"name":"Matthews Whitney","birthday":"06/19/1966"},{"name":"Sellers Day","birthday":"10/24/1960"},{"name":"Ann Gardner","birthday":"03/03/2009"},{"name":"Moore Odom","birthday":"11/23/2016"},{"name":"Vickie Downs","birthday":"12/26/2009"},{"name":"Nolan Stanley","birthday":"09/24/1960"},{"name":"Terri King","birthday":"04/06/1992"},{"name":"Christy Spencer","birthday":"02/19/1991"},{"name":"Alvarez Mclaughlin","birthday":"04/21/1971"},{"name":"Jenna Vaughn","birthday":"07/04/1992"},{"name":"Phyllis Hurst","birthday":"03/24/1962"},{"name":"Mullen Clarke","birthday":"03/02/1982"},{"name":"Helga Beach","birthday":"06/30/2006"},{"name":"Stacey Garrison","birthday":"12/14/1989"},{"name":"Sue Torres","birthday":"06/07/1985"},{"name":"Atkinson Ford","birthday":"05/19/1991"},{"name":"Shana Albert","birthday":"03/02/1998"},{"name":"Heath Petersen","birthday":"03/02/1962"},{"name":"Day Bond","birthday":"07/07/1961"},{"name":"Dyer Arnold","birthday":"04/17/1987"},{"name":"Sabrina Good","birthday":"08/15/2014"},{"name":"Kline Dickerson","birthday":"06/23/1981"},{"name":"Imogene Williams","birthday":"12/07/1997"},{"name":"Trevino French","birthday":"07/04/1984"},{"name":"Pitts Fields","birthday":"11/29/2010"},{"name":"Dona Hickman","birthday":"05/24/1976"},{"name":"Marva Carson","birthday":"03/30/1994"},{"name":"Cassie Burke","birthday":"07/18/1982"},{"name":"Janet Evans","birthday":"04/16/2017"},{"name":"Berta Acevedo","birthday":"08/10/1985"},{"name":"Eve Moody","birthday":"03/06/1976"},{"name":"Tommie Richards","birthday":"07/26/1965"},{"name":"Elvira Cash","birthday":"09/13/2004"},{"name":"Anne Tanner","birthday":"08/31/1979"},{"name":"Sexton Butler","birthday":"06/20/2018"},{"name":"Shannon Becker","birthday":"07/22/1977"},{"name":"Violet Kirk","birthday":"07/09/1981"},{"name":"Nichols Townsend","birthday":"09/05/2014"},{"name":"Judy Padilla","birthday":"04/14/1984"},{"name":"Clay Cervantes","birthday":"04/13/2007"},{"name":"Mia Lee","birthday":"02/25/1965"},{"name":"Kaufman Charles","birthday":"10/02/1974"},{"name":"Martinez Barker","birthday":"03/10/1984"},{"name":"Howell White","birthday":"09/04/2016"},{"name":"Dickson Little","birthday":"07/28/2017"},{"name":"Mercedes Casey","birthday":"12/01/1963"},{"name":"Moreno Nguyen","birthday":"09/04/1964"},{"name":"Kris Walters","birthday":"11/13/1972"},{"name":"Silvia Potts","birthday":"11/07/1960"},{"name":"Sybil Cameron","birthday":"02/27/1995"},{"name":"Tamra Mccoy","birthday":"02/05/2015"},{"name":"Lindsey Cotton","birthday":"01/24/2019"},{"name":"Rocha Wilkins","birthday":"01/07/2018"},{"name":"Willie Hernandez","birthday":"03/26/2014"},{"name":"Hickman Hansen","birthday":"04/17/2018"},{"name":"Gibson Ryan","birthday":"12/08/2019"},{"name":"Leah Wolfe","birthday":"10/13/2014"},{"name":"Gabriela Rhodes","birthday":"07/26/2015"}]

document.getElementById("data_field").value = JSON.stringify(daat)

let calendar = new Calendar()

calendar.init()
