import { useState } from "react";
import {
  Plus,
  ArrowRightLeft,
  Wallet,
  Users,
} from "lucide-react";

export default function App() {

  const [members, setMembers] =
    useState([]);

  const [memberName, setMemberName] =
    useState("");

  const [transactions, setTransactions] =
    useState([]);

  const [formData, setFormData] =
    useState({
      sender: "",
      receiver: "",
      amount: "",
      reason: "",
    });

  const addMember = () => {

    if (!memberName) return;

    const newMember = {
      id: Date.now(),
      name: memberName,
      debit: 0,
      credit: 0,
    };

    setMembers([
      ...members,
      newMember,
    ]);

    setMemberName("");
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      !formData.sender ||
      !formData.receiver ||
      !formData.amount ||
      !formData.reason
    ) {
      alert(
        "Please fill all fields"
      );

      return;
    }

    const newTransaction = {
      id: Date.now(),
      sender: formData.sender,
      receiver:
        formData.receiver,
      amount: formData.amount,
      reason: formData.reason,
      date:
        new Date().toLocaleDateString(),
      time:
        new Date().toLocaleTimeString(),
    };

    setTransactions([
      newTransaction,
      ...transactions,
    ]);

    setMembers((prev) =>
      prev.map((member) => {

        if (
          member.name ===
          formData.sender
        ) {
          return {
            ...member,
            debit:
              member.debit +
              Number(
                formData.amount
              ),
          };
        }

        if (
          member.name ===
          formData.receiver
        ) {
          return {
            ...member,
            credit:
              member.credit +
              Number(
                formData.amount
              ),
          };
        }

        return member;
      })
    );

    setFormData({
      sender: "",
      receiver: "",
      amount: "",
      reason: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 p-6 text-white">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">

          <div>

            <h1 className="text-5xl font-bold">
              SplitSpend
            </h1>

            <p className="text-gray-300 mt-2 text-lg">
              Smart Expense Sharing
              For Friends
            </p>

          </div>

          <div className="flex gap-3">

            <input
              type="text"
              placeholder="Add Member"
              value={memberName}
              onChange={(e) =>
                setMemberName(
                  e.target.value
                )
              }
              className="px-4 py-3 rounded-2xl bg-white/10 border border-white/20 outline-none"
            />

            <button
              onClick={addMember}
              className="bg-gradient-to-r from-pink-500 to-indigo-500 hover:scale-105 transition px-6 py-3 rounded-2xl font-semibold shadow-lg flex items-center gap-2"
            >

              <Plus size={20} />

              Add

            </button>

          </div>

        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/10 shadow-xl">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-300">
                  Total Members
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {members.length}
                </h2>

              </div>

              <Users size={40} />

            </div>

          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/10 shadow-xl">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-300">
                  Transactions
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {transactions.length}
                </h2>

              </div>

              <ArrowRightLeft
                size={40}
              />

            </div>

          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/10 shadow-xl">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-300">
                  Money Flow
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  ₹
                  {transactions.reduce(
                    (acc, item) =>
                      acc +
                      Number(
                        item.amount
                      ),
                    0
                  )}
                </h2>

              </div>

              <Wallet size={40} />

            </div>

          </div>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Members */}
          <div className="lg:col-span-2 space-y-6">

            {members.map(
              (member) => (
                <div
                  key={member.id}
                  className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-xl"
                >

                  <div className="flex items-center gap-4 mb-6">

                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 flex items-center justify-center text-2xl font-bold">
                      {member.name[0]}
                    </div>

                    <div>

                      <h2 className="text-2xl font-bold">
                        {member.name}
                      </h2>

                      <p className="text-gray-300">
                        Group Member
                      </p>

                    </div>

                  </div>

                  <div className="grid grid-cols-2 gap-5">

                    <div className="bg-red-500/20 border border-red-400/20 rounded-2xl p-5 text-center">

                      <p className="text-red-200">
                        Debit
                      </p>

                      <h3 className="text-3xl font-bold mt-2 text-red-100">
                        ₹
                        {member.debit}
                      </h3>

                    </div>

                    <div className="bg-green-500/20 border border-green-400/20 rounded-2xl p-5 text-center">

                      <p className="text-green-200">
                        Credit
                      </p>

                      <h3 className="text-3xl font-bold mt-2 text-green-100">
                        ₹
                        {member.credit}
                      </h3>

                    </div>

                  </div>

                </div>
              )
            )}

          </div>

          {/* Sidebar */}
          <div className="space-y-8">

            {/* Add Transaction */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-xl">

              <h2 className="text-3xl font-bold mb-6">
                Add Transaction
              </h2>

              <form
                onSubmit={
                  handleSubmit
                }
                className="space-y-5"
              >

                <select
                  name="sender"
                  value={
                    formData.sender
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 outline-none"
                >

                  <option value="">
                    Select Sender
                  </option>

                  {members.map(
                    (member) => (
                      <option
                        key={
                          member.id
                        }
                        value={
                          member.name
                        }
                        className="text-black"
                      >
                        {
                          member.name
                        }
                      </option>
                    )
                  )}

                </select>

                <select
                  name="receiver"
                  value={
                    formData.receiver
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 outline-none"
                >

                  <option value="">
                    Select Receiver
                  </option>

                  {members.map(
                    (member) => (
                      <option
                        key={
                          member.id
                        }
                        value={
                          member.name
                        }
                        className="text-black"
                      >
                        {
                          member.name
                        }
                      </option>
                    )
                  )}

                </select>

                <input
                  type="number"
                  name="amount"
                  value={
                    formData.amount
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter Amount"
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 outline-none placeholder:text-gray-300"
                />

                <textarea
                  rows="4"
                  name="reason"
                  value={
                    formData.reason
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Reason for payment"
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 outline-none placeholder:text-gray-300"
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-105 transition py-3 rounded-2xl font-bold shadow-lg"
                >
                  Add Transaction
                </button>

              </form>

            </div>

            {/* Recent Transactions */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-xl">

              <h2 className="text-3xl font-bold mb-6">
                Recent Transactions
              </h2>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">

                {transactions.map(
                  (
                    transaction
                  ) => (
                    <div
                      key={
                        transaction.id
                      }
                      className="bg-white/10 border border-white/10 rounded-2xl p-4"
                    >

                      <div className="flex items-center justify-between">

                        <div>

                          <h3 className="font-semibold text-lg">
                            {
                              transaction.sender
                            }
                            {" ➜ "}
                            {
                              transaction.receiver
                            }
                          </h3>

                          <p className="text-gray-300 text-sm mt-1">
                            {
                              transaction.reason
                            }
                          </p>

                          <p className="text-xs text-gray-400 mt-2">
                            {
                              transaction.date
                            }
                            {" • "}
                            {
                              transaction.time
                            }
                          </p>

                        </div>

                        <div className="text-right">

                          <h3 className="text-2xl font-bold text-green-300">
                            ₹
                            {
                              transaction.amount
                            }
                          </h3>

                        </div>

                      </div>

                    </div>
                  )
                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}