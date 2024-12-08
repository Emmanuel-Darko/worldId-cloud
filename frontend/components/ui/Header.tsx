"use client"
import { VerificationLevel, IDKitWidget, useIDKit } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";
import { verify } from "../app/actions/verify";
import ConnectedAccount from "./ConnectedAccount";

import { useContract } from '@/context/ContractContext';

export default function Header({ children, address }: any) {
    const { account, connectWallet, setShowModal, registerMerchant } = useContract();

    const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`;
    const action = process.env.NEXT_PUBLIC_WLD_ACTION;
    
    if (!app_id) {
        throw new Error("app_id is not set in environment variables!");
    }
    if (!action) {
        throw new Error("action is not set in environment variables!");
    }

    const { setOpen } = useIDKit();

    const onSuccess = (result: ISuccessResult) => {
        // This is where you should perform frontend actions once a user has been verified, such as redirecting to a new page
        // if (window.confirm("Successfully verified with World ID! PROCEED TO ADD ITEM")) {
            // }
        registerMerchant();
        setShowModal(true);
    };
    
    const handleProof = async (result: ISuccessResult) => {
        console.log(
          "Proof received from IDKit, sending to backend:\n",
          JSON.stringify(result)
        ); // Log the proof from IDKit to the console for visibility
        const data = await verify(result);
        if (data.success) {
          console.log("Successful response from backend:\n", JSON.stringify(data)); // Log the response from our backend for visibility
        } else {
          throw new Error(`Verification failed: ${data.detail}`);
        }
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
                        <button
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:scale-105 transition transform"
                            onClick={() => setOpen(true)}
                        >
                            Post Item
                        </button>
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