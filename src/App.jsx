import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

import { db } from "./firebase";


import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Wallet,
  Users,
  ArrowRightLeft,
} from "lucide-react";

export default function App() {
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem("members");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "Harsh Raj",
            give: 500,
            take: 1200,
          },
        ];
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [memberName, setMemberName] = useState("");

  const [formData, setFormData] = useState({
    sender: "",
    receiver: "",
    amount: "",
    reason: "",
  });

useEffect(() => {
  const fetchMembers = async () => {
    const querySnapshot = await getDocs(
      collection(db, "members")
    );

    const memberList = [];

    querySnapshot.forEach((doc) => {
      memberList.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setMembers(memberList);
  };

  fetchMembers();
}, []);


useEffect(() => {
  const fetchTransactions = async () => {
    const querySnapshot = await getDocs(
      collection(db, "transactions")
    );

    const transactionList = [];

    querySnapshot.forEach((doc) => {
      transactionList.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setTransactions(transactionList);
  };

  fetchTransactions();
}, []);

  const addMember = async () => {
  if (!memberName) return;

  const member = {
    name: memberName,
    give: 0,
    take: 0,
  };

  await addDoc(
    collection(db, "members"),
    member
  );

  setMemberName("");
};

  const deleteMember = (id) => {
    setMembers(
      members.filter((member) => member.id !== id)
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleTransaction = async (e) => {
  e.preventDefault();

  if (
    !formData.sender ||
    !formData.receiver ||
    !formData.amount
  ) {
    alert("Fill all fields");
    return;
  }

  const amount = Number(formData.amount);

  const transaction = {
    sender: formData.sender,
    receiver: formData.receiver,
    amount,
    reason: formData.reason,
  };

  await addDoc(
    collection(db, "transactions"),
    transaction
  );

  setFormData({
    sender: "",
    receiver: "",
    amount: "",
    reason: "",
  });
};
  const totalMoney = transactions.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">

      {/* Header */}
      <div className="p-6 border-b border-white/10 flex justify-between items-center">

        <div>
          <h1 className="text-4xl font-bold">
            SplitSpend
          </h1>

          <p className="text-gray-400 mt-1">
            Expense Sharing Dashboard
          </p>
        </div>

        <button className="bg-indigo-500 hover:bg-indigo-600 px-5 py-3 rounded-2xl flex items-center gap-2">
          <Plus size={20} />
          Create Group
        </button>

      </div>

      <div className="grid lg:grid-cols-4 gap-6 p-6">

        {/* Sidebar */}
        <div className="space-y-6">

          {/* Stats */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-5 space-y-5">

            <div className="flex items-center gap-4">
              <Users />
              <div>
                <p className="text-gray-400">
                  Members
                </p>

                <h2 className="text-3xl font-bold">
                  {members.length}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ArrowRightLeft />
              <div>
                <p className="text-gray-400">
                  Transactions
                </p>

                <h2 className="text-3xl font-bold">
                  {transactions.length}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Wallet />
              <div>
                <p className="text-gray-400">
                  Total Money
                </p>

                <h2 className="text-3xl font-bold">
                  ₹{totalMoney}
                </h2>
              </div>
            </div>

          </div>

          {/* Add Member */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-5">

            <h2 className="text-2xl font-bold mb-5">
              Add Member
            </h2>

            <input
              type="text"
              placeholder="Member Name"
              value={memberName}
              onChange={(e) =>
                setMemberName(e.target.value)
              }
              className="w-full p-3 rounded-xl bg-slate-800 outline-none mb-4"
            />

            <button
              onClick={addMember}
              className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-xl"
            >
              Add Member
            </button>

          </div>

        </div>

        {/* Main */}
        <div className="lg:col-span-3 space-y-6">

          {/* Members */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

            {members.map((member) => (
              <div
                key={member.id}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-5"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <div className="w-14 h-14 rounded-full bg-indigo-500 flex items-center justify-center text-2xl font-bold mb-3">
                      {member.name[0]}
                    </div>

                    <h2 className="text-2xl font-bold">
                      {member.name}
                    </h2>

                  </div>

                  <button
                    onClick={() =>
                      deleteMember(member.id)
                    }
                    className="bg-red-500 p-2 rounded-xl"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">

                  <div className="bg-red-500/20 p-4 rounded-2xl text-center">
                    <p className="text-red-300">
                      Give
                    </p>

                    <h3 className="text-2xl font-bold mt-2">
                      ₹{member.give}
                    </h3>
                  </div>

                  <div className="bg-green-500/20 p-4 rounded-2xl text-center">
                    <p className="text-green-300">
                      Take
                    </p>

                    <h3 className="text-2xl font-bold mt-2">
                      ₹{member.take}
                    </h3>
                  </div>

                </div>

              </div>
            ))}

          </div>

          {/* Add Transaction */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6">

            <h2 className="text-3xl font-bold mb-6">
              Add Transaction
            </h2>

            <form
              onSubmit={handleTransaction}
              className="grid md:grid-cols-2 gap-5"
            >

              <select
                name="sender"
                value={formData.sender}
                onChange={handleChange}
                className="p-3 rounded-xl bg-slate-800"
              >
                <option value="">
                  Select Sender
                </option>

                {members.map((member) => (
                  <option
                    key={member.id}
                    value={member.name}
                  >
                    {member.name}
                  </option>
                ))}
              </select>

              <select
                name="receiver"
                value={formData.receiver}
                onChange={handleChange}
                className="p-3 rounded-xl bg-slate-800"
              >
                <option value="">
                  Select Receiver
                </option>

                {members.map((member) => (
                  <option
                    key={member.id}
                    value={member.name}
                  >
                    {member.name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="p-3 rounded-xl bg-slate-800"
              />

              <input
                type="text"
                placeholder="Reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="p-3 rounded-xl bg-slate-800"
              />

              <button
                type="submit"
                className="md:col-span-2 bg-indigo-500 hover:bg-indigo-600 py-3 rounded-xl text-lg font-bold"
              >
                Add Transaction
              </button>

            </form>

          </div>

          {/* Transactions */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6">

            <h2 className="text-3xl font-bold mb-6">
              Recent Transactions
            </h2>

            <div className="space-y-4">

              {transactions.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-800 p-5 rounded-2xl flex justify-between items-center"
                >

                  <div>
                    <h3 className="text-xl font-bold">
                      {item.sender} ➜ {item.receiver}
                    </h3>

                    <p className="text-gray-400 mt-1">
                      {item.reason}
                    </p>
                  </div>

                  <h2 className="text-2xl font-bold text-green-400">
                    ₹{item.amount}
                  </h2>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}