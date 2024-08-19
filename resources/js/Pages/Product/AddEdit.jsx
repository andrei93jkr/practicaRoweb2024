import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function AddEdit({ product }) {

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        id: product?.id || '',
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || '',
        quantity: product?.quantity || '',
    });

    const submit = (e) => {
        e.preventDefault();

        let productRoute = product ? route('product.store', [product.id]) : route('product.store');
        post(productRoute);
    };

    return (
        <AuthenticatedLayout>
            <Head title={product ? 'Edit product' : 'Add product'} />
            <div>
                <div className="py-4 px-4">
                    <div className={'text-xl font-bold'}>{product ? 'Edit product' : 'Add product'}</div>
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                        <div className="mt-6">
                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel htmlFor="id" value="ID" />

                                    <TextInput
                                        id="id"
                                        className="mt-1 block w-full"
                                        value={data.id}
                                        onChange={(e) => setData('id', e.target.value)}
                                        required
                                        isFocused
                                    />

                                    <InputError className="mt-2" message={errors.id} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="name" value="name" />

                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />

                                    <InputError className="mt-2" message={errors.name} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="description" value="description" />

                                    <TextInput
                                        id="description"
                                        className="mt-1 block w-full"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        required
                                    />

                                    <InputError className="mt-2" message={errors.description} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="price" value="price" />

                                    <TextInput
                                        id="price"
                                        className="mt-1 block w-full"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        required
                                    />

                                    <InputError className="mt-2" message={errors.price} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="quantity" value="quantity" />

                                    <TextInput
                                        id="quantity"
                                        className="mt-1 block w-full"
                                        value={data.quantity}
                                        onChange={(e) => setData('quantity', e.target.value)}
                                        required
                                    />

                                    <InputError className="mt-2" message={errors.quantity} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}