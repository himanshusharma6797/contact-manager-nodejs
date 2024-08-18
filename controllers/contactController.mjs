import asyncHandler from "express-async-handler"
// by the help of this library we dont need to add try catch block on the code for async function

import Contact from "../models/contactModel.mjs"
// by the use of model we store the data in the real database 

// @desc Get all contacts
// @route GET /api/contacts
// @access private 
const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id:req.user.id}) 
    res.status(200).json(contacts)  // passing the data getting frm the database to the json
})

// @desc Get a single contact
// @route GET /api/contacts/:id
// @access private 
const getContact = asyncHandler(async (req, res) => {
    const contact  = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found!")
    }
    res.status(200).json(contact)
})

// @desc Create a contact
// @route POST /api/contacts/:id
// @access private 
const createContact = asyncHandler(async (req, res) => {
    console.log('req.body: ', req.body);

    // throw the error if there is not the data in the body
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error("All Fields are mandatory")
    }

    const contactCreate = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    })
    res.status(201).json(contactCreate)
})

// @desc Updating a contact
// @route PUT /api/contacts/:id
// @access private 
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found!")
    }

    // if the one user is want to update the contact of another user then we use
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You dont have the permission to update the contact of another user")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,  // this is the id which user wants to update
        req.body,   // the user give the data
        {new:true}  // we need the updated data instead of the original one
    )
    res.status(200).json(updatedContact)
})

// @desc Deleting a contact
// @route DELETE /api/contacts/:id
// @access private 
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found!")
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You dont have the permission to update the contact of another user")
    }
    
    // Delete the contact using the `deleteOne()` method on the document instance
    await contact.deleteOne();

    // Or alternatively, you could use:
    // await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Contact deleted successfully", contact })
})

const Controllers = {
    getAllContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}

export default Controllers