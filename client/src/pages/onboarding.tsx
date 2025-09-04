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
  Rocket,
  Eye,
  EyeOff
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
    confirmPassword: string;
  };
  youtube: {
    email: string;
    password: string;
    confirmPassword: string;
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
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-full px-4">
      <div className="flex items-center justify-center max-w-sm mx-auto">
        <div className="flex items-center space-x-1 sm:space-x-2">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber <= currentStep;
            const isCompleted = stepNumber < currentStep;
            
            return (
              <div key={stepNumber} className="flex items-center space-x-1 sm:space-x-2">
                <div 
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary text-primary-foreground border-2 border-primary' 
                      : 'bg-muted text-muted-foreground border-2 border-muted'
                  }`}
                  data-testid={`step-indicator-${stepNumber}`}
                >
                  {stepNumber}
                </div>
                {stepNumber < totalSteps && (
                  <div 
                    className={`w-4 sm:w-6 h-0.5 transition-all duration-300 ${
                      isCompleted ? 'bg-primary' : 'bg-muted'
                    }`}
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
        <div className="text-4xl sm:text-6xl" data-testid="welcome-emoji">🚀</div>
        <h1 className="text-xl sm:text-3xl font-bold leading-tight px-2">
          Welcome! We help you grow your{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Instagram & YouTube
          </span>{" "}
          channel 100% on autopilot.
        </h1>
        <p className="text-muted-foreground text-sm sm:text-lg flex items-center justify-center flex-wrap px-4">
          <Shield className="text-accent mr-2 flex-shrink-0" size={18} />
          <span className="text-center">Your data is stored safely with AES-256 encryption.</span>
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-4 sm:space-x-8 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Instagram className="text-pink-500" size={16} />
            <span>Instagram</span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Youtube className="text-red-500" size={16} />
            <span>YouTube</span>
          </div>
        </div>
        
        <Button 
          onClick={onNext}
          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold py-4 sm:py-6 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
          data-testid="button-get-started"
        >
          Get Started
          <ArrowRight className="ml-2" size={18} />
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
        <h2 className="text-xl sm:text-2xl font-bold">Tell us about yourself</h2>
        <p className="text-muted-foreground text-sm sm:text-base">We need some basic information to get started</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
          <Input 
            type="text" 
            id="fullName"
            value={userInfo.fullName}
            onChange={(e) => setUserInfo({ ...userInfo, fullName: e.target.value })}
            placeholder="Enter your full name"
            className="w-full px-3 sm:px-4 py-3 text-sm sm:text-base bg-input border border-border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
            data-testid="input-full-name"
          />
          {errors.fullName && <p className="text-destructive text-xs sm:text-sm">{errors.fullName}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
          <Input 
            type="tel" 
            id="phone"
            value={userInfo.phone}
            onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
            placeholder="+1 (555) 123-4567"
            className="w-full px-3 sm:px-4 py-3 text-sm sm:text-base bg-input border border-border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
            data-testid="input-phone"
          />
          {errors.phone && <p className="text-destructive text-xs sm:text-sm">{errors.phone}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
          <Input 
            type="email" 
            id="email"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            placeholder="your.email@example.com"
            className="w-full px-3 sm:px-4 py-3 text-sm sm:text-base bg-input border border-border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
            data-testid="input-email"
          />
          {errors.email && <p className="text-destructive text-xs sm:text-sm">{errors.email}</p>}
        </div>
      </div>
      
      <Button 
        onClick={handleNext}
        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold py-3 sm:py-4 px-6 rounded-xl transition-all duration-300 text-sm sm:text-base"
        data-testid="button-user-info-next"
      >
        Next
        <ArrowRight className="ml-2" size={16} />
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
        <h2 className="text-xl sm:text-2xl font-bold">Choose your niche</h2>
        <p className="text-muted-foreground text-sm sm:text-base">Select the content category that best fits your audience</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {niches.map((niche) => (
          <button 
            key={niche.id}
            onClick={() => setSelectedNiche(niche.id as Niche)}
            className={`p-3 sm:p-4 border-2 rounded-xl hover:border-primary hover:bg-primary/10 transition-all duration-300 text-left group ${
              selectedNiche === niche.id 
                ? 'border-primary bg-primary/20' 
                : 'border-border'
            }`}
            data-testid={`niche-option-${niche.id}`}
          >
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="text-xl sm:text-2xl flex-shrink-0">{niche.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-xs sm:text-sm truncate">{niche.name}</div>
                <div className="text-xs text-muted-foreground truncate">{niche.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      <Button 
        onClick={onNext}
        disabled={!selectedNiche}
        className={`w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold py-3 sm:py-4 px-6 rounded-xl transition-all duration-300 text-sm sm:text-base ${
          !selectedNiche ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        data-testid="button-niche-next"
      >
        Next
        <ArrowRight className="ml-2" size={16} />
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
    instagramConfirmPassword?: string;
    youtubeEmail?: string;
    youtubePassword?: string;
    youtubeConfirmPassword?: string;
  }>({});
  
  const [passwordVisibility, setPasswordVisibility] = useState({
    instagramPassword: false,
    instagramConfirmPassword: false,
    youtubePassword: false,
    youtubeConfirmPassword: false,
  });
  
  const togglePasswordVisibility = (field: keyof typeof passwordVisibility) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!accounts.instagram.username.trim()) {
      newErrors.instagramUsername = "Instagram username is required";
    }
    
    if (!accounts.instagram.password.trim()) {
      newErrors.instagramPassword = "Instagram password is required";
    }
    
    if (!accounts.instagram.confirmPassword.trim()) {
      newErrors.instagramConfirmPassword = "Please confirm your Instagram password";
    } else if (accounts.instagram.password !== accounts.instagram.confirmPassword) {
      newErrors.instagramConfirmPassword = "Passwords do not match";
    }
    
    if (!accounts.youtube.email.trim()) {
      newErrors.youtubeEmail = "YouTube email is required";
    } else if (!/\S+@\S+\.\S+/.test(accounts.youtube.email)) {
      newErrors.youtubeEmail = "YouTube email is invalid";
    }
    
    if (!accounts.youtube.password.trim()) {
      newErrors.youtubePassword = "YouTube password is required";
    }
    
    if (!accounts.youtube.confirmPassword.trim()) {
      newErrors.youtubeConfirmPassword = "Please confirm your YouTube password";
    } else if (accounts.youtube.password !== accounts.youtube.confirmPassword) {
      newErrors.youtubeConfirmPassword = "Passwords do not match";
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
    <div className="step-transition space-y-4 sm:space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold">Connect your accounts</h2>
        <p className="text-muted-foreground flex items-center justify-center text-xs sm:text-base px-2">
          <Lock className="text-accent mr-2 flex-shrink-0" size={14} />
          <span className="text-center">All credentials are securely encrypted with AES-256</span>
        </p>
      </div>
      
      {/* Instagram Section */}
      <Card className="p-3 sm:p-4 border border-border rounded-xl bg-card/50">
        <div className="flex items-center space-x-2 mb-3">
          <Instagram className="text-pink-500" size={18} />
          <h3 className="font-semibold text-sm sm:text-base">Instagram Account</h3>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-2">
            <Label htmlFor="instagramUsername" className="text-sm font-medium">Username</Label>
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
                className="w-full px-3 sm:px-4 py-3 text-sm sm:text-base bg-input border border-border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent transition-all pr-10"
                data-testid="input-instagram-username"
              />
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={14} />
            </div>
            {errors.instagramUsername && <p className="text-destructive text-xs sm:text-sm">{errors.instagramUsername}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="instagramPassword" className="text-sm font-medium">Password</Label>
            <div className="relative">
              <Input 
                type={passwordVisibility.instagramPassword ? "text" : "password"} 
                id="instagramPassword"
                value={accounts.instagram.password}
                onChange={(e) => setAccounts({
                  ...accounts,
                  instagram: { ...accounts.instagram, password: e.target.value }
                })}
                placeholder="Enter your password"
                className="w-full px-3 sm:px-4 py-3 text-sm sm:text-base bg-input border border-border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent transition-all pr-16"
                data-testid="input-instagram-password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('instagramPassword')}
                className="absolute right-8 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="toggle-instagram-password-visibility"
              >
                {passwordVisibility.instagramPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={14} />
            </div>
            {errors.instagramPassword && <p className="text-destructive text-xs sm:text-sm">{errors.instagramPassword}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="instagramConfirmPassword" className="text-sm font-medium">Confirm Password</Label>
            <div className="relative">
              <Input 
                type={passwordVisibility.instagramConfirmPassword ? "text" : "password"} 
                id="instagramConfirmPassword"
                value={accounts.instagram.confirmPassword}
                onChange={(e) => setAccounts({
                  ...accounts,
                  instagram: { ...accounts.instagram, confirmPassword: e.target.value }
                })}
                placeholder="Confirm your password"
                className="w-full px-3 sm:px-4 py-3 text-sm sm:text-base bg-input border border-border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent transition-all pr-16"
                data-testid="input-instagram-confirm-password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('instagramConfirmPassword')}
                className="absolute right-8 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="toggle-instagram-confirm-password-visibility"
              >
                {passwordVisibility.instagramConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={14} />
            </div>
            {errors.instagramConfirmPassword && <p className="text-destructive text-xs sm:text-sm">{errors.instagramConfirmPassword}</p>}
          </div>
        </div>
      </Card>
      
      {/* YouTube Section */}
      <Card className="p-3 sm:p-4 border border-border rounded-xl bg-card/50">
        <div className="flex items-center space-x-2 mb-3">
          <Youtube className="text-red-500" size={18} />
          <h3 className="font-semibold text-sm sm:text-base">YouTube Account</h3>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-2">
            <Label htmlFor="youtubeEmail" className="text-sm font-medium">Channel Email</Label>
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
                className="w-full px-3 sm:px-4 py-3 text-sm sm:text-base bg-input border border-border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent transition-all pr-10"
                data-testid="input-youtube-email"
              />
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={14} />
            </div>
            {errors.youtubeEmail && <p className="text-destructive text-xs sm:text-sm">{errors.youtubeEmail}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="youtubePassword" className="text-sm font-medium">Password</Label>
            <div className="relative">
              <Input 
                type={passwordVisibility.youtubePassword ? "text" : "password"} 
                id="youtubePassword"
                value={accounts.youtube.password}
                onChange={(e) => setAccounts({
                  ...accounts,
                  youtube: { ...accounts.youtube, password: e.target.value }
                })}
                placeholder="Enter your password"
                className="w-full px-3 sm:px-4 py-3 text-sm sm:text-base bg-input border border-border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent transition-all pr-16"
                data-testid="input-youtube-password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('youtubePassword')}
                className="absolute right-8 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="toggle-youtube-password-visibility"
              >
                {passwordVisibility.youtubePassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={14} />
            </div>
            {errors.youtubePassword && <p className="text-destructive text-xs sm:text-sm">{errors.youtubePassword}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="youtubeConfirmPassword" className="text-sm font-medium">Confirm Password</Label>
            <div className="relative">
              <Input 
                type={passwordVisibility.youtubeConfirmPassword ? "text" : "password"} 
                id="youtubeConfirmPassword"
                value={accounts.youtube.confirmPassword}
                onChange={(e) => setAccounts({
                  ...accounts,
                  youtube: { ...accounts.youtube, confirmPassword: e.target.value }
                })}
                placeholder="Confirm your password"
                className="w-full px-3 sm:px-4 py-3 text-sm sm:text-base bg-input border border-border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent transition-all pr-16"
                data-testid="input-youtube-confirm-password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('youtubeConfirmPassword')}
                className="absolute right-8 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="toggle-youtube-confirm-password-visibility"
              >
                {passwordVisibility.youtubeConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={14} />
            </div>
            {errors.youtubeConfirmPassword && <p className="text-destructive text-xs sm:text-sm">{errors.youtubeConfirmPassword}</p>}
          </div>
        </div>
      </Card>
      
      <Button 
        onClick={handleNext}
        className="w-full bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-primary-foreground font-semibold py-3 sm:py-4 px-6 rounded-xl transition-all duration-300 text-sm sm:text-base"
        data-testid="button-activate-automation"
      >
        <Rocket className="mr-2" size={16} />
        Activate Automation
      </Button>
    </div>
  );
};

const SuccessStep = ({ onFinish }: { onFinish: () => void }) => {
  return (
    <div className="step-transition text-center space-y-6">
      <div className="space-y-4">
        <div className="text-4xl sm:text-6xl animate-bounce" data-testid="success-emoji">🎉</div>
        <h1 className="text-xl sm:text-3xl font-bold px-2">
          Your automation is now live!
        </h1>
        <p className="text-base sm:text-xl text-muted-foreground px-2">
          Sit back and watch your growth{" "}
          <span className="text-xl sm:text-2xl">🚀</span>
        </p>
      </div>
      
      <Card className="p-4 sm:p-6 border border-accent/30 rounded-xl bg-accent/10">
        <h3 className="font-semibold text-accent mb-3 sm:mb-4 text-sm sm:text-base">What happens next?</h3>
        <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Check className="text-accent flex-shrink-0" size={14} />
            <span>Content will be posted automatically</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="text-accent flex-shrink-0" size={14} />
            <span>Engagement tracking starts immediately</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="text-accent flex-shrink-0" size={14} />
            <span>You'll receive weekly growth reports</span>
          </div>
        </div>
      </Card>
      
      <Button 
        onClick={onFinish}
        className="w-full bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-primary-foreground font-semibold py-3 sm:py-4 px-6 rounded-xl transition-all duration-300 text-sm sm:text-base"
        data-testid="button-finish"
      >
        <Check className="mr-2" size={16} />
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
    instagram: { username: '', password: '', confirmPassword: '' },
    youtube: { email: '', password: '', confirmPassword: '' }
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
    <div className="mobile-optimized gradient-bg font-sans text-foreground">
      <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 relative">
        <ProgressIndicator currentStep={currentStep} totalSteps={5} />
        
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
          <div className="glass rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl mt-12 sm:mt-16" data-testid="onboarding-card">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
}
