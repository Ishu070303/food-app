import React from "react";
import { DataTable } from "../components";
import { HiCurrencyRupee } from "../assets/icons/index";
import { useSelector } from "react-redux";

const DBItems = () => {

  const products = useSelector((state) => state.products)
  return (
    <div className="flex items-center justify-center gap-4 pt-6 w-full">
      <DataTable
      columns={[
        {title: "Image", field: "imageURL", render: (rowData) => (
          <img 
          src={rowData.imageURL}
          className="w-32 h-16 object-contain rounded-md"
          />
        )},

        {
          title: "Name",
          field: "product_name"
        }, 

        {
          title: "Category",
          field: "product_category"
        },

        {
          title: "Price",
          field: "product_price",
          render: (rowData) => (
            <p className="text-xl font-semibold text-textColor flex items-center justify-center gap-2">
              <HiCurrencyRupee className="text-red-400" />
              {parseFloat(rowData.product_price).toFixed(2)}
            </p>
          )
        }
      ]}

      data={products}
      title="List of Products"
      actions={[
        {
          icon: "edit",
          tooltip: "Edit Data",
          onClick: (event, rowData) => {
            alert("You want to edit "+ rowData.productId)
          }
        }, 

        {
          icon: "delete",
          tooltip: "Delete Data",
          onClick: (event, rowData) => {
            if(window.confirm("Are you sure, you want to perform this action? ")){
              
            }
          },
        },
      ]}
      />
    </div>
  );
};

export default DBItems;
