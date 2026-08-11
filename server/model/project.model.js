import mongoose, { Types } from "mongoose";

const projectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

  name: {
    type: String,
    required: true,
  },

  originalImage: {
    publicId: String,
    url: String,
  },

  editedImage: {
    publicId: String,
    url: String,
  },

  status: {
    type: String,
    enum: ["draft", "processing", "completed"],
    default: "draft",
  },
  
  editorState: {
  walls: {
    type: Array,
    default: [],
  },

  zoom: {
    type: Number,
    default: 1,
  },

  mode: {
    type: String,
    default: "select",
  },
},

thumbnail: {
  type: String,
  default: "",
},
}, {
    timestamps: true
});

const Project = mongoose.model("project", projectSchema);

export default Project;
