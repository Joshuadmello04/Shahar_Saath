const express = require('express');
const Grievance = require('../models/Grievance');
const { authMiddleware } = require('../middleware/auth'); // JWT authentication middleware
const upload = require('../middleware/upload'); // Multer for file uploads
const router = express.Router();

// POST /api/grievance - Create a new grievance
router.post('/', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    // If there's a file, store its path/URL
    const filePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newGrievance = new Grievance({
      userId,
      title,
      description,
      file: filePath,
    });

    await newGrievance.save();
    res.status(201).json(newGrievance);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to submit grievance' });
  }
});

// GET /api/grievances - Get all grievances for a user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const grievances = await Grievance.find();
    res.status(200).json(grievances);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch grievances' });
  }
});

// PUT /api/grievance/:id - Update grievance status
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const grievanceId = req.params.id;
    const { status } = req.body;

    const updatedGrievance = await Grievance.findByIdAndUpdate(
      grievanceId,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedGrievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }

    res.status(200).json(updatedGrievance);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update grievance' });
  }
});

// DELETE /api/grievance/:id - Delete a grievance
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const grievanceId = req.params.id;
    const deletedGrievance = await Grievance.findByIdAndDelete(grievanceId);

    if (!deletedGrievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }

    res.status(200).json({ message: 'Grievance deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete grievance' });
  }
});

module.exports = router;
