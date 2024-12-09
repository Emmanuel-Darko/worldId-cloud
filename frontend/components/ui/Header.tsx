"use client"
import { VerificationLevel, IDKitWidget, useIDKit } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";
import ConnectedAccount from "./ConnectedAccount";

import { useAppContext } from "@/utils/context";

import { useRouter } from "next/navigation";

export default function Header({ children, address }: any) {
    const { posting, account, connectWallet, setShowModal, registerMerchant } = useAppContext();

    const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`;
    const action = process.env.NEXT_PUBLIC_WLD_ACTION;
    
    if (!app_id) {
        throw new Error("app_id is not set in environment variables!");
    }
    if (!action) {
        throw new Error("action is not set in environment variables!");
    }

    const { setOpen } = useIDKit();

    const onSuccess = async(result: any) => {
        // This is where you should perform frontend actions once a user has been verified, such as redirecting to a new page
        // if (window.confirm("Successfully verified with World ID! PROCEED TO ADD ITEM")) {
            // }
        const success = await registerMerchant()
        if (success) {
            setShowModal(true);
        }
    };

    const Router = useRouter();
    const pushToInvoices = () => {
        Router.push("/invoices");
    };


    return (
        <div>
            <div className="w-full flex flex-col md:flex-row items-center justify-between mb-5 p-5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-white mb-4 md:mb-0">KodeShop</h1>
                {!account ? (
                    <button
                        className="bg-gradient-to-r from-purple-400 to-blue-400 text-white px-6 py-3 rounded-lg hover:scale-105 transition transform"
                        onClick={connectWallet}
                    >
                        Connect Wallet
                    </button>
                ) : (
                    <>
                        <ConnectedAccount address={account} />
                        <span>
                            <a href="#" onClick={pushToInvoices} className="mr-4 underline font-bold text-lg">
                                📜 Invoices
                            </a>
                            <button
                                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:scale-105 transition transform"
                                onClick={() => onSuccess(true)}
                                disabled={posting}
                            >
                                {
                                    posting ?
                                    <span className="ml-2 loader"></span> :
                                    "Post Item"
                                }
                            </button>
                        </span>
                    </>
                )}
            </div>




            <IDKitWidget
                action={action}
                app_id={app_id}
                onSuccess={onSuccess}
                // handleVerify={handleProof}
                verification_level={VerificationLevel.Orb} // Change this to VerificationLevel.Device to accept Orb- and Device-verified users
            />
        </div>
    );
}