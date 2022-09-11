import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createTour, updateTour } from "../redux/features/tourSlice";

const initialState = {
  title: "",
  description: "",
  tags: [],
};
const AddEditTour = () => {
  const [tourData, setTourData] = useState(initialState);
  const [tagErrMsg, setTagErrMsg] = useState(null);
  const { error, loading, userTours } = useSelector((state) => ({
    ...state.tour,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title, description, tags } = tourData;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singleTour = userTours.find((tour) => tour._id === id);
      console.log("s", singleTour);
      setTourData({ ...singleTour });
    }
  }, [id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tags.length) {
      setTagErrMsg("Please provide some tags.");
    }
    if (title && description && tags) {
      const updatedTourData = { ...tourData, name: user?.result?.name };

      if (!id) {
        dispatch(createTour({ updatedTourData, navigate, toast }));
      } else {
        dispatch(updateTour({ id, updatedTourData, navigate, toast }));
      }
      handleClear();
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };

  const handleAddTag = (tag) => {
    setTagErrMsg(null);
    setTourData({ ...tourData, tags: [...tourData.tags, tag] });
  };

  const handleDeleteTag = (deleteTag) => {
    setTourData({
      ...tourData,
      tags: tourData.tags.filter((tag) => tag !== deleteTag),
    });
  };

  const handleClear = () => {
    setTourData({ title: "", description: "", tags: [] });
  };
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
      <MDBCard alignment="center">
        <h5>{id ? "Update Tour " : "Add Tour"}</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3">
            <MDBValidationItem
              className="col-md-12"
              feedback="Please provide your title"
              invalid
            >
              <MDBInput
                label="Title"
                type="text"
                name="title"
                value={title}
                onChange={onInputChange}
                id="validationCustom01"
                required
              />
            </MDBValidationItem>
            <MDBValidationItem
              className="col-md-12"
              feedback="Please provide your description"
              invalid
            >
              <MDBTextArea
                label="Enter Description"
                type="text"
                name="description"
                value={description}
                onChange={onInputChange}
                id="validationCustom02"
                required
                rows={4}
              />
            </MDBValidationItem>
            <div className="col-md-12">
              <ChipInput
                name="tags"
                variant="outlined"
                placeholder="Enter Tag"
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
              {tagErrMsg && <div className="tagErrMsg">{tagErrMsg}</div>}
            </div>
            <div className="d-flex justify-content-start">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setTourData({ ...tourData, imageFile: base64 })
                }
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }}>
                {id ? "Update" : "Submit"}
              </MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEditTour;
