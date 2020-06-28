function CalendarApp() {
    const mappedDayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
    const WEEK_DATA = { mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] }
    const parentSquareSide = 160
    this.prevRawData = null
    this.prevRequestedYear = null

    this.init = function () {
        this.registerListeners()
        this.retrieveValues()
    }

    this.registerListeners = function () {

        const calForm = document.getElementById('cal_form')
        calForm.addEventListener('submit', evt => {
            evt.preventDefault()
            this.retrieveValues()
        })
    }
    
    /**
     * Retrieve and Validate the input data.
     *
     */
    this.retrieveValues = function () {
        
        // Reset errors.
        this.throwError("")
        
        const requestedYear = document.getElementById("year_field").value
        const rawData = document.getElementById("data_field").value

        let data = []

        // Validates the input data.
        try {
            // Show default calendar if data is empty
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
            data = []
        }

        // Re-render only if inputs are changed.
        if (this.prevRawData !== rawData || this.prevRequestedYear !== requestedYear) {
            this.prevRawData = rawData
            this.prevRequestedYear = requestedYear

            this.segregateData(data, requestedYear)
        }
    }

    /**
     * Segregate the data week-wise and sort it day-wise. 
     *
     */
    this.segregateData = function (data, requestedYear) {
        
        let weekData = {...WEEK_DATA}

        data.forEach((person) => {

            // Ignore if person data is valid.
            if (person && person.name && person.birthday) {
                try {
                    const dayOfWeek = new Date(person.birthday).getDay()
                    const bdayYear = new Date(person.birthday).getFullYear()

                    // Ignore this person if his/her bday year isn't the requested year.
                    if (requestedYear && String(bdayYear) !== requestedYear) {
                        return
                    }

                    if (!isNaN(dayOfWeek) && typeof dayOfWeek === "number") {
                        // Get the name of the day.
                        const day = mappedDayOfWeek[dayOfWeek]
                        
                        // Add this person and sort the data for the day of week.
                        const sortedDataOfDay = this.sortByDate([...weekData[day], { ...person }])

                        weekData = {
                            ...weekData,
                            [day]: [...sortedDataOfDay],
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

    /**
     * Render the week-wise calendar.
     *
     * @param {Object} weekData
     */
    this.renderApp = function (weekData) {
        
        let weekEl = ""
        
        // Create day-wise cards.
        for (const day in weekData) {
            if (weekData.hasOwnProperty(day)) {
                const dayData = weekData[day]

                const isEmpty = Array.isArray(dayData) ? dayData.length === 0 : true

                weekEl += `<div class="cal__day ${isEmpty ? "day--empty" : ""}">
                                <div class="cal__day_header">${day}</div>
                                <div class="cal__day_content">
                                    ${this.renderBdayCard(dayData)}
                                </div>
                            </div>`
            }
        }

        document.getElementById("weekly").innerHTML = weekEl
    }

    /**
     * Generates individual bday cards
     *
     * @param {Array} dayData
     * @returns
     */
    this.renderBdayCard = function (dayData) {

        if (!Array.isArray(dayData)) return ''

        let dayCards = ""

        /** 
         * To create squared bday cards with equal sizes, we need to split the day card into a A*A grid.
         * We find the grid size by, rounding upwards the square root of bday count in a day.
         * 
        */
        const grid = Math.ceil(Math.sqrt(dayData.length))

        // The width of each bday card.
        const cardWidth = parseFloat(parentSquareSide / grid).toFixed('5');

        // Flexible font size after bday cards become less than 25px
        const fontSize = cardWidth <= 25 ? `${parseInt(cardWidth/1.8)}px` : 'inherit'

        dayData.forEach((person) => {
                const cardStyle = `background-color: ${this.generateColor()}; width: ${cardWidth}px; height:${cardWidth}px; font-size:${fontSize}`
                dayCards += `<div class="day__person" title='${person.name}, on ${person.birthday}' style="${cardStyle}">
                    ${this.getInitials(person.name)}
                </div>`
        })

        return dayCards
    }

    /**
     *  Returns the initials from a name.
     *
     * @param {string} [fullName='']
     * @returns {string}
     */
    this.getInitials = function (fullName = "") {
        if (!fullName) return ""

        fullName = String(fullName)
        
        // Validate if name has a second name.
        // If a name doesn't have second name, return only first character of the name.
        if (fullName.indexOf(" ") > -1) {

            // Append first character and the character after the space.
            return `${fullName[0]}${fullName[fullName.indexOf(" ") + 1]}`
        }
        
        return fullName[0]
    }

    /**
     * Generates random colors.
     *
     * @returns {string} 
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

    /**
     * Sorts the array by birthday, Youngest to Oldest
     *
     * @param {array} dayData
     * @returns {array}
     */
    this.sortByDate = function (dayData) {
        
        return dayData.sort((a, b) => new Date(b.birthday) - new Date(a.birthday))
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

let calendarInstance = new CalendarApp()

calendarInstance.init()
