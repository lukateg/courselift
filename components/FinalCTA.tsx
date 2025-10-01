"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Clock } from "lucide-react";
import EmailCaptureModal from "./EmailCaptureModal";

export default function FinalCTA() {
  const [showModal, setShowModal] = useState(false);

  const guarantees = ["Completely free", "Special gift", "No commitment"];

  return (
    <section className="bg-white py-20 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-8">
          Ready to become a Top 1% Course Creator?
        </h2>

        <div className="mb-8">
          <Button
            onClick={() => setShowModal(true)}
            className="bg-[#FF6B35] hover:bg-[#e55a2b] text-white text-xl font-bold py-8 px-16 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all "
          >
            Watch Free Training
          </Button>
        </div>

        {/* Risk Reversal */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {guarantees.map((guarantee, index) => (
            <div
              key={index}
              className="flex items-center justify-center space-x-2 text-gray-600"
            >
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>{guarantee}</span>
            </div>
          ))}
        </div>

        {/* Scarcity */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 inline-block">
          <div className="flex items-center justify-center space-x-2 text-red-600 font-bold">
            <Clock className="h-5 w-5" />
            <span>Less than 200 gift spots remaining</span>
          </div>
        </div>
      </div>

      <EmailCaptureModal
        open={showModal}
        onClose={() => setShowModal(false)}
        source="final_cta"
      />
    </section>
  );
}
