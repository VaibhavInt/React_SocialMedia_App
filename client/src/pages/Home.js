import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { getTours } from "../redux/features/tourSlice";

const Home = () => {
  const { tours, loading } = useSelector((state) => ({ ...state.tour }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTours());
  }, []);

  if (loading) {
    return <h2>Loading.......</h2>;
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
      }}
    >
      <MDBRow className="mt-5">
        {tours.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Tours Found
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-2 mt-4">
              {tours && tours.map((item, index) => <h2>Tour Card</h2>)}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Home;
