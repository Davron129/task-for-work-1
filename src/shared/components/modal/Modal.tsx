import { FC, PropsWithChildren } from "react";
import { UsersForm } from "../../../features/user/components";
import { IUser } from "../../models";
import { USER_DEFAULT_VALUE } from "../../../features/user";

interface ModalProps {
    modalId: string;
    title: string;
}

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
    modalId,
    title
}) => {
    return (
        <div
            id={modalId}
            tabIndex={-1}
            aria-hidden="true"
            className="overflow-y-auto overflow-x-hidden fixed top-0 left-0 bottom-0 z-50 justify-center items-center w-full md:inset-0 max-h-full bg-slate-500"
        >
            <div className="relative p-4 w-full max-w-md max-h-full mx-auto">

                <div className="relative bg-white rounded-lg shadow">

                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                        <h3 className="text-lg font-semibold text-gray-900">
                            { title }
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <UsersForm defaultValues={USER_DEFAULT_VALUE} onSuccess={function (values: IUser): void {
                        throw new Error("Function not implemented.");
                    } } />
                </div>
            </div>
        </div>
    )
}