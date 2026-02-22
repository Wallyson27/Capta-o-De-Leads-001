/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Rocket, 
  Target, 
  TrendingUp, 
  Users, 
  Building2, 
  Mail, 
  Phone, 
  Globe,
  ArrowRight
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FormData = {
  name: string;
  company: string;
  email: string;
  whatsapp: string;
  niche: string;
  website: string;
  revenue: string;
  adSpend: string;
  goal: string;
  salesTeam: string;
};

const STEPS = [
  { id: 'welcome', title: 'Início' },
  { id: 'basic', title: 'Contato' },
  { id: 'business', title: 'Negócio' },
  { id: 'financial', title: 'Métricas' },
  { id: 'goals', title: 'Objetivos' },
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  React.useEffect(() => {
    console.log('App component mounted');
  }, []);
  
  const { register, handleSubmit, formState: { errors }, trigger, watch, getValues } = useForm<FormData>({
    defaultValues: {
      niche: '',
      revenue: '',
      adSpend: '',
      goal: '',
      salesTeam: ''
    }
  });

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    
    if (currentStep === 1) fieldsToValidate = ['name', 'company', 'email', 'whatsapp'];
    if (currentStep === 2) fieldsToValidate = ['niche', 'website'];
    if (currentStep === 3) fieldsToValidate = ['revenue', 'adSpend'];
    if (currentStep === 4) fieldsToValidate = ['goal', 'salesTeam'];

    const isValid = fieldsToValidate.length > 0 ? await trigger(fieldsToValidate) : true;
    
    if (isValid && currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    console.log('Submitting data:', data);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      console.log('Server response:', response.status);
      
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        alert('Erro ao enviar formulário. Tente novamente.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Erro de conexão. Tente novamente.');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-6"
          >
            <div className="flex justify-center flex-col items-center gap-4">
              <div className="w-24 h-24 bg-brand-primary/10 rounded-2xl flex items-center justify-center border border-brand-primary/20 shadow-lg shadow-brand-primary/10">
                <Building2 className="w-12 h-12 text-brand-primary" />
              </div>
              <div className="px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-primary">
                Agência de Performance
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
              LimTec & <span className="text-brand-secondary">Inovações</span>
            </h1>
            <p className="text-lg text-white/60 max-w-md mx-auto">
              Pronto para escalar seu negócio? Responda algumas perguntas e descubra como nossa gestão de tráfego pode te ajudar.
            </p>
            
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/5">
              <div className="text-center">
                <div className="text-xl font-bold text-brand-secondary">+1M</div>
                <div className="text-[10px] text-white/40 uppercase">Gerenciados</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-brand-secondary">ROI 5x</div>
                <div className="text-[10px] text-white/40 uppercase">Média</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-brand-secondary">24/7</div>
                <div className="text-[10px] text-white/40 uppercase">Suporte</div>
              </div>
            </div>

            <button 
              onClick={() => setCurrentStep(1)}
              className="btn-primary w-full max-w-xs mx-auto mt-4 group"
            >
              Começar Agora
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        );

      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-display font-bold">Informações de Contato</h2>
              <p className="text-white/60">Como podemos te chamar e onde te encontramos?</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                  <Users className="w-4 h-4" /> Nome Completo
                </label>
                <input 
                  {...register('name', { required: 'Nome é obrigatório' })}
                  placeholder="Seu nome"
                  className={cn("input-field", errors.name && "border-red-500")}
                />
                {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> Nome da Empresa
                </label>
                <input 
                  {...register('company', { required: 'Empresa é obrigatória' })}
                  placeholder="Sua empresa"
                  className={cn("input-field", errors.company && "border-red-500")}
                />
                {errors.company && <span className="text-xs text-red-500">{errors.company.message}</span>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                    <Mail className="w-4 h-4" /> E-mail Corporativo
                  </label>
                  <input 
                    {...register('email', { 
                      required: 'E-mail é obrigatório',
                      pattern: { value: /^\S+@\S+$/i, message: 'E-mail inválido' }
                    })}
                    placeholder="exemplo@empresa.com"
                    className={cn("input-field", errors.email && "border-red-500")}
                  />
                  {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                    <Phone className="w-4 h-4" /> WhatsApp
                  </label>
                  <input 
                    {...register('whatsapp', { required: 'WhatsApp é obrigatório' })}
                    placeholder="(00) 00000-0000"
                    className={cn("input-field", errors.whatsapp && "border-red-500")}
                  />
                  {errors.whatsapp && <span className="text-xs text-red-500">{errors.whatsapp.message}</span>}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-display font-bold">Sobre o seu Negócio</h2>
              <p className="text-white/60">Conte-nos um pouco mais sobre o que você faz.</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-white/80">Qual o seu nicho de atuação?</label>
                <select 
                  {...register('niche', { required: 'Selecione um nicho' })}
                  className={cn("input-field appearance-none", errors.niche && "border-red-500")}
                >
                  <option value="" className="bg-brand-dark">Selecione...</option>
                  <option value="ecommerce" className="bg-brand-dark">E-commerce</option>
                  <option value="servicos" className="bg-brand-dark">Serviços Locais</option>
                  <option value="infoprodutos" className="bg-brand-dark">Infoprodutos</option>
                  <option value="imobiliario" className="bg-brand-dark">Imobiliário</option>
                  <option value="saude" className="bg-brand-dark">Saúde / Estética</option>
                  <option value="outros" className="bg-brand-dark">Outros</option>
                </select>
                {errors.niche && <span className="text-xs text-red-500">{errors.niche.message}</span>}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                  <Globe className="w-4 h-4" /> Site ou Instagram
                </label>
                <input 
                  {...register('website', { required: 'Link é obrigatório' })}
                  placeholder="https://..."
                  className={cn("input-field", errors.website && "border-red-500")}
                />
                {errors.website && <span className="text-xs text-red-500">{errors.website.message}</span>}
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-display font-bold">Métricas Atuais</h2>
              <p className="text-white/60">Isso nos ajuda a entender o seu momento.</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-white/80">Faturamento mensal médio</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Até R$ 10k', 'R$ 10k - R$ 50k', 'R$ 50k - R$ 100k', 'Acima de R$ 100k'].map((val) => (
                    <label key={val} className={cn(
                      "flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-all text-sm",
                      watch('revenue') === val ? "bg-brand-primary/20 border-brand-primary text-white" : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                    )}>
                      <input type="radio" value={val} {...register('revenue', { required: 'Selecione uma opção' })} className="hidden" />
                      {val}
                    </label>
                  ))}
                </div>
                {errors.revenue && <span className="text-xs text-red-500">{errors.revenue.message}</span>}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-white/80">Investimento atual em anúncios</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Não invisto', 'Até R$ 2k', 'R$ 2k - R$ 10k', 'Acima de R$ 10k'].map((val) => (
                    <label key={val} className={cn(
                      "flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-all text-sm",
                      watch('adSpend') === val ? "bg-brand-primary/20 border-brand-primary text-white" : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                    )}>
                      <input type="radio" value={val} {...register('adSpend', { required: 'Selecione uma opção' })} className="hidden" />
                      {val}
                    </label>
                  ))}
                </div>
                {errors.adSpend && <span className="text-xs text-red-500">{errors.adSpend.message}</span>}
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-display font-bold">Objetivos e Vendas</h2>
              <p className="text-white/60">Onde você quer chegar?</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-white/80">Qual o seu principal objetivo?</label>
                <select 
                  {...register('goal', { required: 'Selecione um objetivo' })}
                  className={cn("input-field appearance-none", errors.goal && "border-red-500")}
                >
                  <option value="" className="bg-brand-dark">Selecione...</option>
                  <option value="vendas" className="bg-brand-dark">Vendas Diretas</option>
                  <option value="leads" className="bg-brand-dark">Gerar Leads / Orçamentos</option>
                  <option value="branding" className="bg-brand-dark">Reconhecimento de Marca</option>
                </select>
                {errors.goal && <span className="text-xs text-red-500">{errors.goal.message}</span>}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-white/80">Você possui equipe de vendas?</label>
                <div className="flex gap-4">
                  {['Sim', 'Não'].map((val) => (
                    <label key={val} className={cn(
                      "flex-1 flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-all",
                      watch('salesTeam') === val ? "bg-brand-primary/20 border-brand-primary text-white" : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                    )}>
                      <input type="radio" value={val} {...register('salesTeam', { required: 'Selecione uma opção' })} className="hidden" />
                      {val}
                    </label>
                  ))}
                </div>
                {errors.salesTeam && <span className="text-xs text-red-500">{errors.salesTeam.message}</span>}
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card p-12 text-center max-w-lg w-full space-y-6"
        >
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
          </div>
          <h2 className="text-3xl font-display font-bold">Solicitação Recebida!</h2>
          <p className="text-white/60">
            Obrigado por confiar na LimTec & Inovações. Nossa equipe analisará seus dados e entrará em contato via WhatsApp em até 24h úteis.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-secondary w-full"
          >
            Voltar ao Início
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start md:justify-center p-4 md:p-6 relative overflow-x-hidden bg-brand-dark">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-secondary/5 blur-[120px] rounded-full" />
      </div>
      
      <div className="w-full max-w-2xl z-10 py-8 md:py-0">
        {/* Progress Bar */}
        {currentStep > 0 && (
          <div className="mb-8 space-y-2">
            <div className="flex justify-between text-xs font-medium text-white/40 uppercase tracking-wider">
              <span>Passo {currentStep} de {STEPS.length - 1}</span>
              <span>{STEPS[currentStep].title}</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                className="h-full bg-brand-primary"
              />
            </div>
          </div>
        )}

        <div className="glass-card p-6 md:p-12 shadow-2xl flex flex-col">
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
          </div>

          {currentStep > 0 && (
            <div className="mt-8 pt-6 border-t border-white/5 flex flex-row gap-3">
              <button 
                type="button"
                onClick={prevStep}
                className="btn-secondary flex-1 py-3 px-2 text-xs sm:text-base flex items-center justify-center gap-1 sm:gap-2"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                Anterior
              </button>
              
              {currentStep === STEPS.length - 1 ? (
                <button 
                  type="button"
                  onClick={async () => {
                    const isValid = await trigger();
                    if (isValid) {
                      const data = getValues();
                      await onSubmit(data);
                    } else {
                      console.log('Validation errors:', errors);
                    }
                  }}
                  className="btn-primary flex-1 py-3 px-2 text-xs sm:text-base flex items-center justify-center gap-1 sm:gap-2"
                >
                  Finalizar
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              ) : (
                <button 
                  type="button"
                  onClick={nextStep}
                  className="btn-primary flex-1 py-3 px-2 text-xs sm:text-base flex items-center justify-center gap-1 sm:gap-2"
                >
                  Próximo
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-white/20 text-xs uppercase tracking-widest flex flex-col gap-2">
          <span>&copy; {new Date().getFullYear()} LimTec & Inovações - Todos os direitos reservados</span>
          <span className="text-[8px] opacity-50">v1.0.2 - Live Preview</span>
        </div>
      </div>
    </div>
  );
}
