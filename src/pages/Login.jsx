import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div className="relative min-h-screen flex flex-col md:flex-row bg-linear-to-br from-[#444343] via-[#444444] to-[#6e6363] overflow-hidden">
      {/* الخلفية الدائرية */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute w-[600px] h-[600px] bg-purple-600/20 rounded-full
                     top-[-200px] left-[-100px] blur-3xl animate-pulse-slow"
        ></div>
        <div
          className="absolute w-[500px] h-[500px] bg-pink-500/20 rounded-full
                     bottom-[-100px] right-[-100px] blur-3xl animate-pulse-slow"
        ></div>
      </div>

      {/* العمود اليسار (اللوقو + النص) */}
      <div className="flex-1 flex flex-col items-start justify-between lg:pl-40 p-6 md:p-10 z-10">
        <motion.img
          src={assets.logo}
          alt=""
          className="h-12 object-contain mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />

        <div className="flex items-center gap-3 mb-6 max-md:mt-10">
          <img src={assets.group_users} className="h-8 md:h-10" />

          <div>
            <div className="flex gap-1">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-transparent fill-[#FFD700] drop-shadow-lg animate-pulse"
                  />
                ))}
            </div>

            <p className="text-gray-300 text-sm mt-1">
              17,000+ adventurers already inside
            </p>
          </div>
        </div>

        <motion.h1
          className="text-3xl md:text-6xl font-bold bg-linear-to-r
                     from-[#ffd700] via-[#aaaaaa] to-[#ffd700]
                     bg-clip-text text-transparent
                     drop-shadow-[0_0_15px_rgba(255,215,0,0.7)]
                     leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Enter a world where connections sparkle and conversations shine
        </motion.h1>

        <motion.h1
          className="text-white mt-4 md:mt-6 max-w-lg text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Step through the portal of imagination, meet kindred spirits, and let
          your messages glow with life. Every story, every whisper, every laugh
          becomes a spark in the digital sky.
        </motion.h1>
      </div>

      {/* العمود اليمين (كرت Clerk) */}
      <div className="flex-1 flex items-center justify-center p-6 sm:10 z-10">
        <motion.div
          className="
            w-full max-w-md p-8 rounded-3xl
            bg-linear-to-br
            from-[#222222]/60 via-[#555555]/40 to-[#FFD700]/20
            backdrop-blur-md
            shadow-[0_0_30px_rgba(255,215,0,0.5)]
          "
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <SignIn
            appearance={{
              baseTheme: "dark",
              variables: {
                colorPrimary: "#FFD700",
                colorText: "#ffffff",
                colorBackground: "transparent",
                colorInputBackground: "rgba(40,40,40,0.6)",
                colorCardBackground: "rgba(20,20,20,0.6)",
              },
              elements: {
                card:
                  "rounded-3xl shadow-[0_0_25px_rgba(255,215,0,0.5)] border border-yellow-300/20 backdrop-blur-xl",
                headerTitle:
                  "text-transparent bg-gradient-to-r from-[#ffffff] via-[#aaaaaa] to-[#FFD700] bg-clip-text text-2xl font-bold",
                headerSubtitle: "text-gray-300",
                socialButtonsBlockButton:
                  "bg-gradient-to-r from-[#333333] via-[#777777] to-[#FFD700] text-white rounded-xl hover:scale-105 transition-all",
                formFieldInput:
                  "bg-[#222222]/60 border border-gray-500/30 rounded-xl text-white focus:ring-2 focus:ring-[#FFD700]",
                formButtonPrimary:
                  "bg-gradient-to-r from-[#555555] via-[#aaaaaa] to-[#FFD700] text-white font-semibold py-2 rounded-xl shadow-[0_0_15px_rgba(255,215,0,0.6)]",
                footerActionLink:
                  "text-yellow-400 hover:text-yellow-300",
                footer: "hidden",
              },
            }}
          />
        </motion.div>
      </div>

      {/* النجوم */}
      {Array(15)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#FFD700] rounded-full opacity-50 animate-starTwinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
    </div>
  );
};

export default Login;
