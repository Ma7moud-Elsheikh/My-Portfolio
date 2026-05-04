'use client';

import emailjs from 'emailjs-com';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { FiSend } from 'react-icons/fi';
import { MdOutlineEmail } from 'react-icons/md';
import * as Yup from 'yup';

interface ContactFormValues {
    name: string;
    email: string;
    message: string;
}

const Contact = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLDivElement>(null);
    const emailRef = useRef<HTMLDivElement>(null);
    const messageRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            if (headerRef.current) {
                gsap.fromTo(
                    headerRef.current,
                    { opacity: 0, y: 50, filter: 'blur(15px)' },
                    {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        duration: 1.2,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: 'top 85%'
                        }
                    }
                );
            }

            const nameElement = nameRef.current;
            const emailElement = emailRef.current;
            const messageElement = messageRef.current;
            const buttonElement = buttonRef.current;

            if (nameElement && emailElement && messageElement && buttonElement) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: formRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                });

                tl.fromTo(
                    nameElement,
                    { opacity: 0, x: -80, rotationY: 15, filter: 'blur(8px)' },
                    {
                        opacity: 1,
                        x: 0,
                        rotationY: 0,
                        filter: 'blur(0px)',
                        duration: 0.8,
                        ease: 'back.out(0.6)'
                    }
                )
                    .fromTo(
                        emailElement,
                        { opacity: 0, x: 80, rotationY: -15, filter: 'blur(8px)' },
                        {
                            opacity: 1,
                            x: 0,
                            rotationY: 0,
                            filter: 'blur(0px)',
                            duration: 0.8,
                            ease: 'back.out(0.6)'
                        },
                        '-=0.4'
                    )
                    .fromTo(
                        messageElement,
                        { opacity: 0, scale: 0.95, y: 40, filter: 'blur(8px)' },
                        {
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            filter: 'blur(0px)',
                            duration: 0.7,
                            ease: 'elastic.out(0.8, 0.5)'
                        },
                        '-=0.3'
                    )
                    .fromTo(
                        buttonElement,
                        { opacity: 0, scale: 0.8, rotation: -5, filter: 'blur(4px)' },
                        {
                            opacity: 1,
                            scale: 1,
                            rotation: 0,
                            filter: 'blur(0px)',
                            duration: 0.6,
                            ease: 'bounce.out'
                        },
                        '-=0.2'
                    );

                const inputs = [nameElement, emailElement, messageElement];
                inputs.forEach((element) => {
                    const input = element.querySelector('input, textarea');
                    if (input) {
                        input.addEventListener('focus', () => {
                            gsap.to(element, { scale: 1.02, duration: 0.3, ease: 'power2.out' });
                        });
                        input.addEventListener('blur', () => {
                            gsap.to(element, { scale: 1, duration: 0.3, ease: 'power2.in' });
                        });
                    }
                });

                const button = buttonElement.querySelector('button');
                if (button) {
                    button.addEventListener('mouseenter', () => {
                        gsap.to(button, {
                            scale: 1.05,
                            boxShadow: '0 0 20px rgba(59,130,246,0.5)',
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    });
                    button.addEventListener('mouseleave', () => {
                        gsap.to(button, {
                            scale: 1,
                            boxShadow: 'none',
                            duration: 0.3,
                            ease: 'power2.in'
                        });
                    });
                }
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        message: Yup.string().required('Message is required')
    });

    const handleSubmit = (
        values: ContactFormValues,
        { resetForm }: FormikHelpers<ContactFormValues>
    ) => {
        // ✅ إصلاح الـ bug — استخدام values مباشرة
        emailjs
            .send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                {
                    name: values.name,
                    email: values.email,
                    message: values.message
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            )
            .then(() => {
                alert('Message sent successfully ✅');
                resetForm();
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);
                alert('Failed to send ❌');
            });
    };

    return (
        <section
            ref={sectionRef}
            aria-label="Contact section"
            className="relative py-10 md:py-20 bg-[#0a0a0a] overflow-hidden"
        >
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-600/10 blur-[150px] rounded-full -z-10" />

            <div className="max-w-6xl mx-auto flex flex-col gap-12 px-6">
                <div className="space-y-4" ref={headerRef}>
                    {/* React Icon */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-bold uppercase tracking-widest">
                        <MdOutlineEmail className="w-4 h-4" aria-hidden="true" />
                        Contact Me
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                        <span className="text-transparent uppercase bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-500">
                            Let&apos;s work
                            <br /> together
                        </span>
                    </h2>
                </div>

                <div ref={formRef}>
                    <Formik
                        initialValues={{ name: '', email: '', message: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-6" aria-label="Contact form" noValidate>
                                {/* Name */}
                                <div ref={nameRef} className="relative transform-gpu">
                                    <label htmlFor="name" className="sr-only">
                                        Your Name
                                    </label>
                                    <Field
                                        id="name"
                                        name="name"
                                        placeholder="Your Name"
                                        autoComplete="name"
                                        className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 outline-none focus:border-blue-500 focus:bg-white/10 transition-all duration-300"
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component="div"
                                        className="text-red-400 text-sm mt-1"
                                    />
                                </div>

                                {/* Email */}
                                <div ref={emailRef} className="relative transform-gpu">
                                    <label htmlFor="email" className="sr-only">
                                        Your Email
                                    </label>
                                    <Field
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Your Email"
                                        autoComplete="email"
                                        className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 outline-none focus:border-blue-500 focus:bg-white/10 transition-all duration-300"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-red-400 text-sm mt-1"
                                    />
                                </div>

                                {/* Message */}
                                <div ref={messageRef} className="relative transform-gpu">
                                    <label htmlFor="message" className="sr-only">
                                        Your Message
                                    </label>
                                    <Field
                                        id="message"
                                        as="textarea"
                                        name="message"
                                        placeholder="Tell me about your project..."
                                        rows={5}
                                        className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 outline-none focus:border-blue-500 focus:bg-white/10 transition-all duration-300 resize-none"
                                    />
                                    <ErrorMessage
                                        name="message"
                                        component="div"
                                        className="text-red-400 text-sm mt-1"
                                    />
                                </div>

                                {/* Button */}
                                <div ref={buttonRef} className="relative transform-gpu">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        aria-label="Send message"
                                        className="w-full md:w-auto px-8 py-4 bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium transition-all duration-300 relative overflow-hidden group flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {/* React Icon */}
                                        <FiSend className="w-4 h-4 text-white" aria-hidden="true" />
                                        <span className="relative z-10">
                                            {isSubmitting ? 'Sending...' : 'Send Message'}
                                        </span>
                                        <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </section>
    );
};

export default Contact;
