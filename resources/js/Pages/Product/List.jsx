import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Fragment } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function List({ products }) {

    const { delete: deleteProduct } = useForm({});

    const handleDeleteProduct = (id) => {
        deleteProduct(route('product.delete', [id]));
    }

    return (
        <AuthenticatedLayout>
            <Head title="Products list" />
            <div className='w-full'>
                <div className="py-4 px-4">
                    <div className={'text-xl font-bold'}>Products</div>

                    <div className="mt-6">
                        <div className='grid grid-cols-6'>
                            <div className='font-bold mb-3'>ID</div>
                            <div className='font-bold mb-3'>Name</div>
                            <div className='font-bold mb-3'>Description</div>
                            <div className='font-bold mb-3'>Price</div>
                            <div className='font-bold mb-3'>Quantity</div>
                            <div className='font-bold mb-3'>Actions</div>

                            {products.map((product, index) => {
                                return <Fragment>
                                    <div className='mb-2'>{product.id}</div>
                                    <div className='mb-2'>{product.name}</div>
                                    <div className='mb-2'>{product.description}</div>
                                    <div className='mb-2'>{product.price}</div>
                                    <div className='mb-2'>{product.quantity}</div>
                                    <div className={'mb-2 flex items-center'}>
                                        <Link href={route('product.update', [product.id])}>
                                            <FontAwesomeIcon icon={faPencil} className={'text-blue-600'} />
                                        </Link>

                                        {/* Form for deleting the category */}
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                handleDeleteProduct(product.id);
                                            }}
                                            className={"inline-block ml-2"}
                                        >
                                            <button type="submit">
                                                <FontAwesomeIcon icon={faTrash} className={'text-red-600'} />
                                            </button>
                                        </form>
                                    </div>
                                </Fragment>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    );
}