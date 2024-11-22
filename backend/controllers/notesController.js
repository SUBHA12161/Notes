const Notes = require('../models/notesModel');

module.exports.add = async (req, res) => {
    try {
        const { title, body, color } = req.body;

        if (!title || !body || !color) {
            res.status(400).json({ message: 'Fill all the fields.' });
        }

        const data = new Notes(req.body);
        await data.save();

        res.status(200).json({ status: "Success", data });
    } catch (error) {
        console.log("add error == ", error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports.get = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;

        if (page <= 0 || size <= 0) {
            return res.status(400).json({ message: 'Invalid page or size value' });
        }

        const total = await Notes.countDocuments();
        const skip = (page - 1) * size;

        const data = await Notes.find({}, { updatedAt: 0, __v: 0 })
            .skip(skip)
            .limit(size);

        res.status(200).json({
            status: "Success",
            currentPage: page,
            total,
            pageSize: size,
            data,
        });
    } catch (error) {
        console.log("get error == ", error);
        res.status(500).json({ message: 'Server error' });
    }
};