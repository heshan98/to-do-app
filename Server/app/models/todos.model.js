module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        task: String,
        completed: Boolean,
        userId: String 
      },
      { timestamps: true },
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Todo = mongoose.model("todo", schema); 
    return Todo;
};
