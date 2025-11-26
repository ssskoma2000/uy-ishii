const { writeFile, readFile } = require('../utils/fs.js')

function getCar(req, res) {
    let data = readFile('./cars.json')
    return res.json({
        message: 'Muvaffaqiyatli',
        data,
    })
}

function postCar(req, res) {
    let { model, color, raqam, userId } = req.body

    if (!(model && color && raqam && userId)) {
        return res.json({
            message: 'yozuv kiritilishi shart',
        })
    }

    let users = readFile('./users.json')
    let user = users.find(el => el.id == userId)

    if (!user) {
        return res.json({
            message: 'bu id  da foydalanuvchi topilmadi',
        })
    }

    let cars = readFile('./cars.json')

    let id = cars.length ? cars[cars.length - 1].id + 1 : 1

    let newCar = {
        id,
        model,
        color,
        raqam,
        userId
    }

    cars.push(newCar)
    let message = writeFile('./cars.json', cars)

    return res.json({
        message,
        newCar,
    })
}

function getCarById(req, res) {
    let cars = readFile('./cars.json')
    const id = +req.params.id

    let car = cars.find(el => el.id == id)

    if (!car) {
        return res.json({
            message: "Bu  mashina topilmadi",
        })
    }

    res.json({
        message: "Muvaffaqiyatli",
        car
    })
}

function updateCar(req, res) {
    let cars = readFile('./cars.json')
    const id = +req.params.id

    let car = cars.find(el => el.id == id)
    if (!car) {
        return res.json({
            message: "Bu id boyicha mashina topilmadi",
        })
    }

    let { model, color, raqam, userId } = req.body

    if (userId) {
        let users = readFile('./users.json')
        let user = users.find(el => el.id == userId)
        if (!user) {
            return res.json({
                message: "Bu id boyicha foydalanuvchi topilmadi"
            })
        }
    }

    car.model = model || car.model
    car.color = color || car.color
    car.raqam = raqam || car.raqam
    car.userId = userId || car.userId

    writeFile('./cars.json', cars)

    res.json({
        message: "ozgartirildi",
        car
    })
}

function deleteCar(req, res) {
    let cars = readFile('./cars.json')
    const id = +req.params.id

    let filtr = cars.filter(el => el.id != id)

    writeFile('./cars.json', filtr)

    res.json({
        message: "Muvaffaqiyatli ochirildi"
    })
}

module.exports = {
    getCar,
    postCar,
    getCarById,
    updateCar,
    deleteCar
}
