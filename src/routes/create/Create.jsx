import { useLayoutEffect, useState } from "react";
import "./Create.scss";
import { instance } from "../../api";
import { toast } from "react-toastify";

const Create = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useLayoutEffect(() => {
    instance
      .get("/api/categories")
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCreatePost = (e) => {
    e.preventDefault();
    setLoading(true);
    instance
      .post("/api/posts", {
        title: title,
        image: image,
        category: category,
        description: description,
      })
      .then((response) => {
        setLoading(false);
        if (response.status === 201) {
          toast.success("Post created successfully");
          console.log(response);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        toast.error(error.response.data.errors[0].msg);
      });
  };

  return (
    <div className="create">
      <h2 className="create-title">Create New Post</h2>
      <form onSubmit={handleCreatePost} className="create-form">
        <label htmlFor="title">Post title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          type="text"
        />
        <label htmlFor="image">Post image</label>
        <div className="create-wrapper">
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            id="image"
            type="url"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            id="select"
          >
            <option selected disabled hidden>
              Select post category
            </option>
            {categories.map((category) => (
              <option key={category._id}>{category._id}</option>
            ))}
          </select>
        </div>
        <label htmlFor="content">Post description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="content"
          cols="30"
          rows="10"
        ></textarea>
        <div className="btn">
          <button disabled={loading} className="create-btn" type="submit">
            {loading ? "Creating..." : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
