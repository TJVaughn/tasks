const Agenda = require('agenda')

const agenda = new Agenda({
    db: {
        address: process.env.MONGO_URL,
        options: { useUnifiedTopology: true }
    },
    collection: 'jobs',
    processEvery: '30 seconds',
})

let scheduleJobTypes = ['pickQOTD']

scheduleJobTypes.forEach(type => {
    require('./jobs/' + type)(agenda)
})

let graceful = () => {
    agenda.stop(() => process.exit(0))
}

process.on("SIGTERM", graceful)
process.on("SIGINT", graceful)

module.exports = agenda