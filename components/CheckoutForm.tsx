import React, { useState } from 'react';

interface CheckoutFormProps {
    onSuccess: () => void;
    onCancel: () => void;
    total: number;
}

const InputField: React.FC<{
    label: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    hint?: string;
}> = ({ label, placeholder, type = 'text', required = true, name, value, onChange, className = '', hint }) => (
    <div className={`space-y-2 ${className}`}>
        <label className="text-[10px] uppercase tracking-widest text-aire-stone block font-medium">
            {label}
            {hint && <span className="ml-2 opacity-50 lowercase font-normal italic">({hint})</span>}
        </label>
        <input
            required={required}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full border border-aire-stone/20 p-4 text-aire-text font-sans focus:outline-none focus:border-aire-text transition-colors bg-white text-sm rounded-none appearance-none placeholder:text-aire-stone/30"
        />
    </div>
);

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSuccess, onCancel, total }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentData, setPaymentData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvc: ''
    });

    const handlePaymentInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let formattedValue = value.replace(/\D/g, '');

        if (name === 'cardNumber') {
            formattedValue = formattedValue.substring(0, 16);
            formattedValue = formattedValue.match(/.{1,4}/g)?.join(' ') || formattedValue;
        } else if (name === 'expiryDate') {
            formattedValue = formattedValue.substring(0, 4);
            if (formattedValue.length > 2) {
                formattedValue = formattedValue.substring(0, 2) + ' / ' + formattedValue.substring(2);
            }
        } else if (name === 'cvc') {
            formattedValue = formattedValue.substring(0, 3);
        }

        setPaymentData(prev => ({ ...prev, [name]: formattedValue }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const cleanCard = paymentData.cardNumber.replace(/\s/g, '');
        const cleanExpiry = paymentData.expiryDate.replace(/\s|\//g, '');

        if (cleanCard.length !== 16 || cleanExpiry.length !== 4 || paymentData.cvc.length !== 3) {
            alert('Por favor, completa los datos de pago correctamente.');
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            onSuccess();
        }, 2000);
    };

    return (
        <div className="max-w-lg mx-auto w-full space-y-10 lg:space-y-12">
            <div className="hidden lg:flex justify-between items-center mb-10">
                <button
                    onClick={onCancel}
                    className="cursor-pointer text-aire-stone hover:text-aire-text text-[10px] uppercase tracking-widest flex items-center gap-2 transition-colors group"
                >
                    <svg className="w-3 h-3 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Volver a la tienda
                </button>
            </div>

            <form className="space-y-12 pb-12 mt-3" onSubmit={handleSubmit}>
                <section className="space-y-6">
                    <h3 className="font-serif text-2xl text-aire-text border-b border-aire-stone/20 pb-2">Información de Contacto</h3>
                    <InputField label="Correo electrónico" type="email" placeholder="nombre@ejemplo.com" />
                    <label className="flex items-center gap-3 cursor-pointer group pt-1">
                        <input type="checkbox" className="w-4 h-4 border-aire-stone/30 rounded-none accent-aire-text" />
                        <span className="text-[11px] text-aire-stone group-hover:text-aire-text transition-colors">Enviarme noticias y ofertas por email</span>
                    </label>
                </section>

                <section className="space-y-6">
                    <h3 className="font-serif text-2xl text-aire-text border-b border-aire-stone/20 pb-2">Dirección de Envío</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField label="Nombre" />
                        <InputField label="Apellidos" />
                    </div>
                    <InputField label="Dirección" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField label="Ciudad" />
                        <InputField label="Código postal" />
                    </div>
                </section>

                <section className="space-y-6 pt-4">
                    <div className="flex justify-between items-end border-b border-aire-stone/20 pb-2">
                        <h3 className="font-serif text-2xl text-aire-text">Pago</h3>
                        <span className="text-[9px] text-aire-stone uppercase tracking-tight">Transacción Segura</span>
                    </div>
                    <div className="space-y-4">
                        <InputField
                            label="Número de tarjeta"
                            name="cardNumber"
                            value={paymentData.cardNumber}
                            onChange={handlePaymentInput}
                            placeholder="0000 0000 0000 0000"
                            className="font-mono"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <InputField
                                label="Caducidad"
                                name="expiryDate"
                                value={paymentData.expiryDate}
                                onChange={handlePaymentInput}
                                placeholder="MM / AA"
                            />
                            <InputField
                                label="CVC"
                                name="cvc"
                                value={paymentData.cvc}
                                onChange={handlePaymentInput}
                                placeholder="123"
                            />
                        </div>
                    </div>
                </section>

                <div className="pt-0">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-aire-text text-white py-5 text-sm uppercase tracking-[0.4em] hover:bg-aire-dark transition-all duration-700 relative overflow-hidden group disabled:opacity-70 shadow-2xl active:scale-[0.98]"
                    >
                        <span className={isSubmitting ? 'opacity-0' : 'opacity-100'}>
                            Finalizar Pago — {total} €
                        </span>
                        {isSubmitting && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            </div>
                        )}
                    </button>
                    <p className="mt-6 text-center text-[9px] uppercase tracking-[0.2em] text-aire-stone">
                        Garantía de tranquilidad para tus compras
                    </p>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;
