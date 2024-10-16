'use client'
import useForm from "@/hooks/useForm"
import { showToast } from "@/utils/axios"
import axios from 'axios'


const baseURL = 'https://api.naijazoneonline.com/api/'

const ContactDetails = () => {
    const [nameState, setname, resetName] = useForm('')
    const [emailState, setemail, resetEmail] = useForm('')
    const [subjectState, setsubject, resetSubject] = useForm('')
    const [messageState, setMessage, resetMessage] = useForm('')

    type event = React.MouseEvent<HTMLFormElement, MouseEvent>
    const handleSubmit = async (e:event) => {
        e.preventDefault()
        const data = {fullname: nameState, email: emailState, subject: subjectState, message: messageState}
        try{
            axios.post(`${baseURL}contact`, data)
            .then(res => showToast('success', res.data.message))
            if(resetName) resetName('');
            if(resetEmail) resetEmail('');
            if(resetSubject) resetSubject('');
            if(resetMessage) resetMessage('');
        }catch{(e:Error) => console.log}
    }

    return (
        <section>
            <div className='contact-details-section py-[60px] lg:pt-[90px] lg:pb-[170px] px-[--padding-x]'>
                <h1 className='text-2xl lg:text-[46.4px] leading-[36px] lg:leading-[69.6px] pb-5 flex items-center justify-center gap-4 text-center font-semibold'><span>We’re always Online!</span> <span className="bg-[#3CD856] text-[--foreground-green] px-3 py-[4px] text-xs rounded-[5px] font-bold">Active</span></h1>
                <p className='px-[--padding-x] mb-[30px] lg:mb-16 md:px-0 text-base lg:text-lg max-w-[601.73px] mx-auto text-center'>
                    Naijazone is designed to tackle these challenges head-on, providing a seamless experience for both vendors and consumers.
                </p>

                <div className="contact-Entries flex flex-col lg:flex-row items-start lg:items-center justify-center gap-10">
                    <div className="col w-full lg:w-max">
                        <form className='px-[22px] py-[19px] bg-[--form-green] rounded-[9.09px]' onSubmit={handleSubmit}>
                            <div className="fname-lname flex flex-col mb-[22px]">
                                <label htmlFor="fname-lname" className='font-semibold text-sm mb-2'>First & Last Name</label>
                                <input type="text" id='fname-lname' onChange={e => setname(e)} value={nameState} required className='w-full lg:w-[272.57px] pl-7 pr-2 py-3 rounded-lg text-sm outline-none text-black placeholder:text-[--text-color-gray]' placeholder='i.e. John Doe' />
                            </div>
                            
                            <div className="email flex flex-col mb-[22px]">
                                <label htmlFor="email" className='font-semibold text-sm mb-2'>Email</label>
                                <input type="text" id='email' onChange={e => setemail(e)} value={emailState} required className='w-full lg:w-[272.57px] pl-7 pr-2 py-3 rounded-lg text-sm outline-none text-black placeholder:text-[--text-color-gray]' placeholder='i.e. john@mail.com' />
                            </div>

                            <div className="subject flex flex-col mb-[22px]">
                                <label htmlFor="subject" className='font-semibold text-sm mb-2'>Subject</label>
                                <input type="text" id='subject' onChange={e => setsubject(e)} value={subjectState} required className='w-full lg:w-[272.57px] pl-7 pr-2 py-3 rounded-lg text-sm outline-none text-black placeholder:text-[--text-color-gray]' placeholder='i.e. I need a help' />
                            </div>

                            <div className="message flex flex-col mb-[22px]">
                                <label htmlFor="message" className='font-semibold text-sm mb-2'>Message</label>
                                <textarea id='message' rows={2} onChange={(e:any) => setMessage(e)} value={messageState} className='w-full lg:w-[272.57px] pl-7 pr-2 py-3 rounded-lg text-sm outline-none text-black placeholder:text-[--text-color-gray]' placeholder='Type your message' />
                            </div>

                            <button className='px-7 py-4 bg-[--foreground-green] text-[--foreground-light-orange] text-base lg:text-lg text-white rounded-lg block w-full'>
                                <div className="flex items-center justify-center w-full">
                                    <span>Send</span>
                                </div>
                            </button>
                        </form>
                    </div>
                    <div className="col">
                        <div className='pb-10'>
                            <h3 className='font-semibold text-base lg:text-lg mb-4'>Call us</h3>
                            <p className='text-[--text-color-gray]'>+1-940-394-2948</p>
                            <p className='text-[--text-color-gray]'>+1-389-385-3807</p>
                        </div>

                        <div className='pb-10'>
                            <h3 className='font-semibold text-base lg:text-lg mb-4'>Email us</h3>
                            <p className='text-[--text-color-gray]'>support@naijazoneonline.com</p>
                            <p className='text-[--text-color-gray]'>contact@naijazoneonline.com</p>
                        </div>

                        <div className='pb-10'>
                            <h3 className='font-semibold text-base lg:text-lg'>Visit us</h3>
                            <p className='text-[--text-color-gray]'>34 Madison Street,</p>
                            <p className='text-[--text-color-gray]'>NY, USA 10005</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactDetails