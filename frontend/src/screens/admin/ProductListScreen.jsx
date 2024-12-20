import React from "react";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Button, Col, Row, Table } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import { toast } from "react-toastify";
import Paginate from "../../components/Paginate";
const ProductListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    console.log("ID", id);
    if (window.confirm("Are you sure")) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product? ")) {
      try {
        await createProduct();
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createProductHandler}>
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <Button
                        as={Link}
                        to={`/admin/product/${product._id}/edit`}
                        variant="light"
                        className="btn-sm mx-2"
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        onClick={() => deleteHandler(product._id)}
                        variant="danger"
                        className="btn-sm"
                      >
                        <FaTrash style={{ color: "white" }} />
                      </Button>
                    </td>
                  </tr>
                ))}
              <Paginate pages={data.pages} page={data.page} isAdmin={true} />
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
