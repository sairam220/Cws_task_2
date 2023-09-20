# MultiSeller Excel File Validation App

This README provides an overview of the MultiSeller Excel File Validation App, its functionality, and how to use it.

## Deployment

This application is deployed on Vercel and can be accessed at the following URL: [https://sairam-cws-2.vercel.app/](https://sairam-cws-2.vercel.app/).


## Overview

The MultiSeller Excel File Validation App is a web application built with React that allows users to upload and validate multiple types of Excel files, including "Seller_customer.xlsx" and "Seller_invoice.xlsx". The app performs data validation on the uploaded files and displays both valid and invalid data in separate tables, making it easy to identify and address data issues.

## Features

- Supports uploading Excel files in multiple formats, including `.xlsx`, `.xls`, and `.csv`.
- Performs data validations based on the uploaded file's format (Seller Customer or Seller Invoice).
- Displays valid data in a table with proper formatting.
- Highlights and categorizes invalid data with reasons for validation failure.
- Supports validation for various fields such as ERP code, legal name, GSTIN, PAN, invoice number, and invoice date.
- Easily customizable with CSS styles for table formatting.

## Getting Started

To use the MultiSeller Excel File Validation App in your project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/<username>/sairam-cws-2.git
   ```

2. Install dependencies:

   ```bash
   cd sairam-cws-2
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Access the application in your web browser at [http://localhost:3000](http://localhost:3000).

## Usage

1. Upon accessing the application, you will see an upload form that allows you to select an Excel file for validation.

2. Click the "Choose File" button and select an Excel file from your local system. Supported formats include `.xlsx`, `.xls`, and `.csv`.

3. After selecting a file, click the "Upload" button to initiate the validation process.

4. The app will automatically detect the format of the uploaded file (Seller Customer or Seller Invoice) and perform validations accordingly.

5. If the uploaded file is valid and matches one of the predefined formats ("Seller_customer.xlsx" or "Seller_invoice.xlsx"), the valid data will be displayed in a table with proper formatting.

6. If the uploaded file contains invalid data or does not match the expected format, the invalid data will be displayed in a separate table with corresponding reasons for validation failure.

7. You can switch between different uploaded files using the navigation menu at the top of the app.


## Dependencies

The primary dependencies used in this project are:

- React: A JavaScript library for building user interfaces.
- XLSX: A library for parsing and creating Excel files.
- react-loader-spinner: A library for displaying loading spinners.

## Feedback and Issues

If you encounter any issues with this application or have feedback to improve it, please [open an issue](https://github.com/<username>/sairam-cws-2/issues) on the GitHub repository.

---

Feel free to adapt and integrate the MultiSeller Excel File Validation App into your own projects to handle Excel file uploads and data validation for multiple seller files.
