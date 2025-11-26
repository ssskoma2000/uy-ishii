const { readFile, writeFile } = require("../utils/fs.js")

function postUser(req, res) {
    const body = req.body

    if (!(body.firstName && body.phone && body.password)) {
        return res.json({
            message: " ma'lumotlar kiritilishi shart"
        })
    }

    let data = readFile("./users.json")

    let user = data.find(el => el.phone == body.phone)
    if (user) {
        return res.json({
            message: "Bu telefon raqam bilan foydalanuvchi mavjud"
        })
    }

    body.id = data.length + 1

    data.push(body)

    const msg = writeFile("./users.json", data)

    res.json({
        message: msg,
        user: body
    })
}

module.exports = {
postUser
}
