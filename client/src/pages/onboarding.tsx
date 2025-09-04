import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { 
  Shield, 
  ArrowRight, 
  Lock, 
  Instagram, 
  Youtube, 
  Check,
  Rocket
} from "lucide-react";

interface UserInfo {
  fullName: string;
  phone: string;
  email: string;
}

interface Accounts {
  instagram: {
    username: string;
    password: string;
  };
  youtube: {
    email: string;
    password: string;
  };
}

type Niche = 'motivation' | 'love' | 'business' | 'asmr' | 'tech' | 'other';

const niches = [
  { id: 'motivation', name: 'Motivation', description: 'Inspirational content', emoji: '💪' },
  { id: 'love', name: 'Love/Shayari', description: 'Romantic content', emoji: '❤️' },
  { id: 'business', name: 'Business/Quotes', description: 'Professional content', emoji: '💼' },
  { id: 'asmr', name: 'ASMR/Relaxation', description: 'Calming content', emoji: '🧘' },
  { id: 'tech', name: 'Evolving AI / Tech', description: 'Technology content', emoji: '🤖' },
  { id: 'other', name: 'Other', description: 'Custom niche', emoji: '✨' }
];

const ProgressIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  return (
    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-10">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber <= currentStep;
            const isCompleted = stepNumber < currentStep;
            
            return (
              <div key={stepNumber} className="flex items-center space-x-2">
                <div 
                  className={`step-indicator ${isActive ? 'active' : ''}`}
                  data-testid={`step-indicator-${stepNumber}`}
                >
                  {stepNumber}
                </div>
                {stepNumber < totalSteps && (
                  <div 
                    className={`step-line ${isCompleted ? 'completed' : ''}`}
                    data-testid={`step-line-${stepNumber}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const WelcomeStep = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="step-transition text-center space-y-6">
      <div className="space-y-4">
        <div className="text-6xl" data-testid="welcome-emoji">🚀</div>
        <h1 className="text-3xl font-bold leading-tight">
          Welcome! We help you grow your{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Instagram & YouTube
          </span>{" "}
          channel 100% on autopilot.
        </h1>
        <p className="text-muted-foreground text-lg flex items-center justify-center">
          <Shield className="text-accent mr-2" size={20} />
          Your data is stored safely with AES-256 encryption.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Instagram className="text-pink-500" size={20} />
            <span>Instagram</span>
          </div>
          <div className="flex items-center space-x-2">
            <Youtube className="text-red-500" size={20} />
            <span>YouTube</span>
          </div>
        </div>
        
        <Button 
          onClick={onNext}
          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold py-6 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          data-testid="button-get-started"
        >
          Get Started
          <ArrowRight className="ml-2" size={20} />
        </Button>
      </div>
    </div>
  );
};

const UserInfoStep = ({ 
  userInfo, 
  setUserInfo, 
  onNext 
}: { 
  userInfo: UserInfo; 
  setUserInfo: (info: UserInfo) => void; 
  onNext: () => void; 
}) => {
  const [errors, setErrors] = useState<Partial<UserInfo>>({});

  const validateForm = () => {
    const newErrors: Partial<UserInfo> = {};
    
    if (!userInfo.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!userInfo.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    
    if (!userInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      newErrors.email = "Email is invalid";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="step-transition space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Tell us about yourself</h2>
        <p className="text-muted-foreground">We need some basic information to get started</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input 
            type="text" 
            id="fullName"
            value={userInfo.fullName}
            onChange={(e) => setUserInfo({ ...userInfo, fullName: e.target.value })}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
            data-testid="input-full-name"
          />
          {errors.fullName && <p className="text-destructive text-sm">{errors.fullName}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input 
            type="tel" 
            id="phone"
            value={userInfo.phone}
            onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
            placeholder="+1 (555) 123-4567"
            className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
            data-testid="input-phone"
          />
          {errors.phone && <p className="text-destructive text-sm">{errors.phone}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input 
            type="email" 
            id="email"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            placeholder="your.email@example.com"
            className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
            data-testid="input-email"
          />
          {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
        </div>
      </div>
      
      <Button 
        onClick={handleNext}
        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold py-4 px-6 rounded-xl transition-all duration-300"
        data-testid="button-user-info-next"
      >
        Next
        <ArrowRight className="ml-2" size={20} />
      </Button>
    </div>
  );
};

const NicheSelectionStep = ({ 
  selectedNiche, 
  setSelectedNiche, 
  onNext 
}: { 
  selectedNiche: Niche | null; 
  setSelectedNiche: (niche: Niche) => void; 
  onNext: () => void; 
}) => {
  return (
    <div className="step-transition space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Choose your niche</h2>
        <p className="text-muted-foreground">Select the content category that best fits your audience</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {niches.map((niche) => (
          <button 
            key={niche.id}
            onClick={() => setSelectedNiche(niche.id as Niche)}
            className={`p-4 border-2 rounded-xl hover:border-primary hover:bg-primary/10 transition-all duration-300 text-left group ${
              selectedNiche === niche.id 
                ? 'border-primary bg-primary/20' 
                : 'border-border'
            }`}
            data-testid={`niche-option-${niche.id}`}
          >
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{niche.emoji}</div>
              <div>
                <div className="font-semibold text-sm">{niche.name}</div>
                <div className="text-xs text-muted-foreground">{niche.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      <Button 
        onClick={onNext}
        disabled={!selectedNiche}
        className={`w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold py-4 px-6 rounded-xl transition-all duration-300 ${
          !selectedNiche ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        data-testid="button-niche-next"
      >
        Next
        <ArrowRight className="ml-2" size={20} />
      </Button>
    </div>
  );
};

const AccountSetupStep = ({ 
  accounts, 
  setAccounts, 
  onNext 
}: { 
  accounts: Accounts; 
  setAccounts: (accounts: Accounts) => void; 
  onNext: () => void; 
}) => {
  const [errors, setErrors] = useState<{
    instagramUsername?: string;
    instagramPassword?: string;
    youtubeEmail?: string;
    youtubePassword?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!accounts.instagram.username.trim()) {
      newErrors.instagramUsername = "Instagram username is required";
    }
    
    if (!accounts.instagram.password.trim()) {
      newErrors.instagramPassword = "Instagram password is required";
    }
    
    if (!accounts.youtube.email.trim()) {
      newErrors.youtubeEmail = "YouTube email is required";
    } else if (!/\S+@\S+\.\S+/.test(accounts.youtube.email)) {
      newErrors.youtubeEmail = "YouTube email is invalid";
    }
    
    if (!accounts.youtube.password.trim()) {
      newErrors.youtubePassword = "YouTube password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="step-transition space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Connect your accounts</h2>
        <p className="text-muted-foreground flex items-center justify-center">
          <Lock className="text-accent mr-2" size={16} />
          All credentials are securely encrypted with AES-256
        </p>
      </div>
      
      {/* Instagram Section */}
      <Card className="p-4 border border-border rounded-xl bg-card/50">
        <div className="flex items-center space-x-2 mb-3">
          <Instagram className="text-pink-500" size={20} />
          <h3 className="font-semibold">Instagram Account</h3>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="instagramUsername">Username</Label>
            <div className="relative">
              <Input 
                type="text" 
                id="instagramUsername"
                value={accounts.instagram.username}
                onChange={(e) => setAccounts({
                  ...accounts,
                  instagram: { ...accounts.instagram, username: e.target.value }
                })}
                placeholder="@your_username"
                className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent transition-all pr-10"
                data-testid="input-instagram-username"
              />
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            </div>
            {errors.instagramUsername && <p className="text-destructive text-sm">{errors.instagramUsername}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="instagramPassword">Password</Label>
            <div className="relative">
              <Input 
                type="password" 
                id="instagramPassword"
                value={accounts.instagram.password}
                onChange={(e) => setAccounts({
                  ...accounts,
                  instagram: { ...accounts.instagram, password: e.target.value }
                })}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent transition-all pr-10"
                data-testid="input-instagram-password"
              />
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            </div>
            {errors.instagramPassword && <p className="text-destructive text-sm">{errors.instagramPassword}</p>}
          </div>
        </div>
      </Card>
      
      {/* YouTube Section */}
      <Card className="p-4 border border-border rounded-xl bg-card/50">
        <div className="flex items-center space-x-2 mb-3">
          <Youtube className="text-red-500" size={20} />
          <h3 className="font-semibold">YouTube Account</h3>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="youtubeEmail">Channel Email</Label>
            <div className="relative">
              <Input 
                type="email" 
                id="youtubeEmail"
                value={accounts.youtube.email}
                onChange={(e) => setAccounts({
                  ...accounts,
                  youtube: { ...accounts.youtube, email: e.target.value }
                })}
                placeholder="your.channel@gmail.com"
                className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent transition-all pr-10"
                data-testid="input-youtube-email"
              />
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            </div>
            {errors.youtubeEmail && <p className="text-destructive text-sm">{errors.youtubeEmail}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="youtubePassword">Password</Label>
            <div className="relative">
              <Input 
                type="password" 
                id="youtubePassword"
                value={accounts.youtube.password}
                onChange={(e) => setAccounts({
                  ...accounts,
                  youtube: { ...accounts.youtube, password: e.target.value }
                })}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent transition-all pr-10"
                data-testid="input-youtube-password"
              />
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            </div>
            {errors.youtubePassword && <p className="text-destructive text-sm">{errors.youtubePassword}</p>}
          </div>
        </div>
      </Card>
      
      <Button 
        onClick={handleNext}
        className="w-full bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-primary-foreground font-semibold py-4 px-6 rounded-xl transition-all duration-300"
        data-testid="button-activate-automation"
      >
        <Rocket className="mr-2" size={20} />
        Activate Automation
      </Button>
    </div>
  );
};

const SuccessStep = ({ onFinish }: { onFinish: () => void }) => {
  return (
    <div className="step-transition text-center space-y-6">
      <div className="space-y-4">
        <div className="text-6xl animate-bounce" data-testid="success-emoji">🎉</div>
        <h1 className="text-3xl font-bold">
          Your automation is now live!
        </h1>
        <p className="text-xl text-muted-foreground">
          Sit back and watch your growth{" "}
          <span className="text-2xl">🚀</span>
        </p>
      </div>
      
      <Card className="p-6 border border-accent/30 rounded-xl bg-accent/10">
        <h3 className="font-semibold text-accent mb-4">What happens next?</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Check className="text-accent" size={16} />
            <span>Content will be posted automatically</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="text-accent" size={16} />
            <span>Engagement tracking starts immediately</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="text-accent" size={16} />
            <span>You'll receive weekly growth reports</span>
          </div>
        </div>
      </Card>
      
      <Button 
        onClick={onFinish}
        className="w-full bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-primary-foreground font-semibold py-4 px-6 rounded-xl transition-all duration-300"
        data-testid="button-finish"
      >
        <Check className="mr-2" size={20} />
        Finish
      </Button>
    </div>
  );
};

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    fullName: '',
    phone: '',
    email: ''
  });
  const [selectedNiche, setSelectedNiche] = useState<Niche | null>(null);
  const [accounts, setAccounts] = useState<Accounts>({
    instagram: { username: '', password: '' },
    youtube: { email: '', password: '' }
  });

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleFinish = () => {
    // In a real app, this would redirect to the dashboard
    console.log('Onboarding completed!', {
      userInfo,
      selectedNiche,
      accounts
    });
    alert('Onboarding completed! Redirecting to dashboard...');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WelcomeStep onNext={nextStep} />;
      case 2:
        return (
          <UserInfoStep 
            userInfo={userInfo} 
            setUserInfo={setUserInfo} 
            onNext={nextStep} 
          />
        );
      case 3:
        return (
          <NicheSelectionStep 
            selectedNiche={selectedNiche} 
            setSelectedNiche={setSelectedNiche} 
            onNext={nextStep} 
          />
        );
      case 4:
        return (
          <AccountSetupStep 
            accounts={accounts} 
            setAccounts={setAccounts} 
            onNext={nextStep} 
          />
        );
      case 5:
        return <SuccessStep onFinish={handleFinish} />;
      default:
        return <WelcomeStep onNext={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen gradient-bg font-sans text-foreground">
      <div className="min-h-screen flex items-center justify-center p-4">
        <ProgressIndicator currentStep={currentStep} totalSteps={5} />
        
        <div className="w-full max-w-md">
          <div className="glass rounded-2xl p-8 shadow-2xl" data-testid="onboarding-card">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
}
