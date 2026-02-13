import { useState } from 'react';
import { Dialog } from '@headlessui/react';

type AuthMode = 'login' | 'signup';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCodeSent) {
      // Envoyer le code SMS (simulation)
      setIsCodeSent(true);
      console.log(`Code envoyé au ${phone}`);
    } else {
      // Vérifier le code et connecter l'utilisateur
      console.log(`Connexion avec code: ${code}`);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-obsidian-900/80" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-xl bg-obsidian-800 p-6 text-obsidian-50">
          <Dialog.Title className="text-2xl font-bold mb-6">
            {mode === 'login' ? 'Connexion' : 'Inscription'}
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isCodeSent ? (
              <div>
                <label htmlFor="phone" className="block mb-2">
                  Numéro de téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 rounded-lg bg-obsidian-700 border border-obsidian-600 focus:border-obsidian-400 focus:outline-none"
                  placeholder="+41 79 123 45 67"
                  required
                />
              </div>
            ) : (
              <div>
                <label htmlFor="code" className="block mb-2">
                  Code de vérification
                </label>
                <input
                  type="text"
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full p-3 rounded-lg bg-obsidian-700 border border-obsidian-600 focus:border-obsidian-400 focus:outline-none"
                  placeholder="123456"
                  required
                />
                <button
                  type="button"
                  onClick={() => setIsCodeSent(false)}
                  className="mt-2 text-obsidian-300 hover:text-obsidian-100 text-sm"
                >
                  Changer de numéro
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-obsidian-500 hover:bg-obsidian-400 rounded-lg font-medium transition-colors duration-200"
            >
              {isCodeSent ? 'Se connecter' : 'Envoyer le code'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-obsidian-700 text-center">
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-obsidian-300 hover:text-obsidian-100"
            >
              {mode === 'login'
                ? "Pas de compte ? S'inscrire"
                : 'Déjà un compte ? Se connecter'}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
