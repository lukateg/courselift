"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Users } from "lucide-react";
import { trackCustomEvent } from "@/lib/tracking";

interface EmailCaptureModalProps {
  open: boolean;
  onClose: () => void;
  source?: string; // Track where the modal was opened from
  onSuccess?: () => void; // Callback for successful submission
}

export default function EmailCaptureModal({
  open,
  onClose,
  source = "unknown",
  onSuccess,
}: EmailCaptureModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [trackingEventId, setTrackingEventId] = useState<string | null>(null);

  // Track modal open/close events
  useEffect(() => {
    if (open) {
      trackCustomEvent.modalOpen("email_capture", source);
    }
  }, [open, source]);

  const handleClose = () => {
    trackCustomEvent.modalClose("email_capture", "user_action");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Track waitlist signup attempt and store event ID for continuation
    const eventId = trackCustomEvent.waitlistStart(source);
    setTrackingEventId(eventId);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name: name || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      // Track successful waitlist signup with event ID continuity
      trackCustomEvent.waitlistComplete(
        email,
        source,
        trackingEventId || undefined
      );

      setSubmitted(true);

      // Reset form after successful submission
      setEmail("");
      setName("");

      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        }
        handleClose();
        setSubmitted(false);
      }, 2000);
    } catch (err) {
      console.error("Subscription error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              You&apos;re In!
            </h3>
            <p className="text-gray-600">
              Check your email for exclusive early access details.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-[#2C3E50] mb-2">
            Unlock your Free Training
          </DialogTitle>
          <div className="flex items-center justify-center text-gray-500 text-sm">
            <div>
              <span className="font-bold text-green-500">
                FREE BONUS INCLUDED:
              </span>{" "}
              First <span className="font-bold">1000</span> joiners get{" "}
              <span className="font-bold">50% </span>
              discount on our soon to be launched platform for growing courses -{" "}
              <span className="font-bold">Course Lift</span>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name (Optional)
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
              placeholder="Your name"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FF6B35] hover:bg-[#e55a2b] text-white font-bold py-3 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Joining Waitlist..." : "Watch Free Training"}
          </Button>

          <div className="flex items-center justify-center text-xs text-gray-500 mt-4">
            <Shield className="h-3 w-3 mr-1" />
            Your information is 100% secure. Unsubscribe anytime.
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
