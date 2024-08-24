import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";


export default function List({ categories, flash }) {
    const { delete: deleteEntry } = useForm({});

    const handleDelete = (id) => {
        deleteEntry(route('categories.delete', [id]), {
            onFinish: () => {
                router.reload({ only: ['categories'] });
            },
        });
    };

    const { data: categoryList = [], links = [] } = categories;

    return (
        <AuthenticatedLayout flash={flash}>
            <Head title="Category list" />
            <div className='w-full'>
                <div className="py-4 px-4">
                    <div className={'text-xl font-bold'}>Categories</div>

                    <div className={'flex justify-end my-2'}>
                        <Link href={route('categories.create')}>
                            <FontAwesomeIcon icon={faPlus} /> Add new category
                        </Link>
                    </div>


                    <div className="mt-6">
                        <div className={'grid grid-cols-4'}>
                            <div className={'font-bold mb-3'}>ID</div>
                            <div className={'font-bold mb-3'}>Name</div>
                            <div className={'font-bold mb-3'}>Order</div>
                            <div className={'font-bold mb-3'}>Actions</div>

                            {categories.data.map((category, index) => {
                                return <Fragment key={index}>
                                    <div className={'mb-2'}>{category.id}</div>
                                    <div className={'mb-2'}>{category.name}</div>
                                    <div className={'mb-2'}>{category.order}</div>
                                    <div className={'mb-2'}>
                                        <Link href={route('categories.update', [category.id])}>
                                            <FontAwesomeIcon icon={faPencil} className={'text-blue-600'} />
                                        </Link>

                                        <FontAwesomeIcon onClick={() => handleDelete(category.id)} icon={faTrash} className={'text-red-600 ml-2 cursor-pointer'} />
                                    </div>
                                </Fragment>
                            })}
                        </div>

                        <div className={'flex justify-center mt-4 mb-6'}>
                            {categories.links.map((link, key) => (<Fragment key={key}>
                                {link.url && !link.active && <Link className={'bg-blue-500 p-2 text-white mr-2'} href={link.url}>
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} /></Link>}
                                {link.url && link.active && <span className={'bg-gray-500 p-2 text-white mr-2'}>{link.label}</span>}
                            </Fragment>))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}