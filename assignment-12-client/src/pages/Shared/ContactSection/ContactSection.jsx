import React from 'react';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';

const ContactSection = () => {


    const sendEmail = (e) => {
        e.preventDefault()

        emailjs.sendForm(import.meta.env.VITE_serviceID, import.meta.env.VITE_templateID, e.target, import.meta.env.VITE_EMAILKEY)
            .then(() => {

                Swal.fire({
                    title: 'Successful',
                    text: 'Email Send Successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                }).then(() => {
                    e.target.reset()
                })
            }, (error) => {
                Swal.fire({
                    title: 'FAILED...',
                    text: { error },
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
            });
    }


    return (
        <section className='px-5 bg-[#F6F5F2]'>
            <div className="my-container flex flex-col xl:flex-row justify-between items-stretch xl:items-end py-20 gap-16">
                <div className='flex-1'>
                    <div className='mb-10 mx-auto'>
                        <div className="divider uppercase w-[200px] font-semibold text-base text-[#9abe29]">
                            Contact Form
                        </div>
                        <h2 className={`text-left text-3xl font-bold underline uppercase`}>
                            GET IN TOUCH
                        </h2>
                    </div>
                    <form onSubmit={sendEmail} className='flex flex-col justify-between'>
                        <input required className='mb-8 border w-full p-3 text-sm font-semibold' type="text" name="from_name" id="name-input" placeholder='Your Name' />
                        <input required className='mb-8 border w-full p-3 text-sm font-semibold' type="email" name="reply_to" id="email-input" placeholder='Your Email' />
                        <textarea required className='mb-8 border p-3 text-sm font-semibold' name="message" id="message-input" cols="30" rows="10" placeholder='Message'></textarea>
                        <input type="submit" value="Submit message" className='my-btn cursor-pointer' />
                    </form>
                </div>
                <div className='flex-1 flex flex-col-reverse xl:flex-row justify-between items-start xl:items-center gap-12 xl:gap-5'>

                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44043.109494144075!2d-82.66090460616141!3d46.375452027008144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4d310e43a98d2623%3A0x79e1acf6fda6ea8b!2sElliot%20Lake%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sbd!4v1689079122745!5m2!1sen!2sbd" height="460" style={{ "border": "0", width: '100%' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

                </div>
            </div>
        </section>
    );
};

export default ContactSection;