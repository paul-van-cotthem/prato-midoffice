import { useData, type BackendMessage } from '../components/DataProvider';
import { 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  Send, 
  AlertCircle, 
  Trash2, 
  Code,
  ChevronRight,
  Search,
  Zap
} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function MessageQueue() {
  const { t } = useTranslation();
  const { messageQueue, clearQueue } = useData();
  const [selectedMessage, setSelectedMessage] = useState<BackendMessage | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMessages = messageQueue.filter(m => 
    m.type.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-950/30';
      case 'Sent': return 'bg-blue-100 text-blue-700 dark:bg-blue-950/30';
      case 'Processed': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return <Clock className="w-4 h-4" />;
      case 'Sent': return <Send className="w-4 h-4 transition-all animate-pulse" />;
      case 'Processed': return <CheckCircle2 className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-50 flex items-center gap-3">
            <MessageSquare className="w-10 h-10 text-emerald-500" />
            {t('message_queue.title')}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium italic">
            {t('message_queue.subtitle')}
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={clearQueue}
            className="flex items-center gap-2 p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/50 rounded-2xl hover:bg-rose-100 transition-all font-bold group text-sm"
          >
            <Trash2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            {t('message_queue.clear_queue')}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        {/* Messages List */}
        <div className="xl:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/50">
               <div className="relative flex-1 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                  <input 
                    type="text" 
                    placeholder={t('message_queue.search_placeholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 pl-11 pr-4 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-sm font-medium"
                  />
               </div>
               <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap">
                 {filteredMessages.length} {t('message_queue.messages_count')}
               </div>
            </div>

            <div className="max-h-[600px] overflow-y-auto divide-y divide-slate-50 dark:divide-slate-800/50">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    className={`w-full text-left p-6 flex items-center justify-between transition-all hover:bg-slate-50 dark:hover:bg-slate-800/30 group ${selectedMessage?.id === msg.id ? 'bg-emerald-50/50 dark:bg-emerald-950/10 border-l-4 border-l-emerald-500' : 'border-l-4 border-l-transparent'}`}
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-transform group-hover:scale-110 ${getStatusStyle(msg.status)} border-current opacity-70`}>
                        <Zap className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-500 transition-colors">{msg.type}</h4>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter flex items-center gap-1 ${getStatusStyle(msg.status)}`}>
                            {getStatusIcon(msg.status)}
                            {msg.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-xs text-slate-400 font-medium">
                          <span className="font-mono">{msg.id}</span>
                          <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-slate-300 transition-all ${selectedMessage?.id === msg.id ? 'translate-x-1 text-emerald-500' : 'group-hover:translate-x-1'}`} />
                  </button>
                ))
              ) : (
                <div className="p-20 text-center text-slate-400">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-10" />
                  <p className="font-bold tracking-tight">{t('message_queue.no_messages')}</p>
                  <p className="text-sm">{t('message_queue.no_messages_sub')}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* JSON Inspector */}
        <div className="space-y-4">
           {selectedMessage ? (
             <div className="bg-slate-900 border border-slate-800 rounded-[2rem] shadow-2xl overflow-hidden sticky top-8 animate-in slide-in-from-right-4 duration-500">
                <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-800/50">
                   <div className="flex items-center gap-3 text-white">
                      <Code className="w-5 h-5 text-emerald-400" />
                      <span className="font-bold uppercase tracking-widest text-xs">{t('message_queue.json_payload')}</span>
                   </div>
                   <button 
                     onClick={() => {
                       navigator.clipboard.writeText(JSON.stringify(selectedMessage.payload, null, 2));
                     }}
                     className="text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-widest transition-colors px-3 py-1 border border-slate-700 rounded-lg"
                   >
                     {t('message_queue.copy_json')}
                   </button>
                </div>
                <div className="p-8">
                   <pre className="text-emerald-400 font-mono text-sm overflow-x-auto custom-scrollbar leading-relaxed">
                     {JSON.stringify(selectedMessage.payload, null, 2)}
                   </pre>
                </div>
                <div className="p-6 bg-slate-800/30 border-t border-slate-800">
                   <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                         <span>{t('message_queue.status_log')}</span>
                         <span>{new Date(selectedMessage.timestamp).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-emerald-500" />
                         <span className="text-xs text-slate-300 font-medium">{t('message_queue.gen_msg_log')}</span>
                      </div>
                      {selectedMessage.status === 'Sent' && (
                        <div className="flex items-center gap-3">
                           <div className="w-2 h-2 rounded-full bg-blue-500" />
                           <span className="text-xs text-slate-300 font-medium">{t('message_queue.sent_msg_log')}</span>
                        </div>
                      )}
                      {selectedMessage.status === 'Processed' && (
                        <div className="flex items-center gap-3">
                           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                           <span className="text-xs text-emerald-400 font-bold">{t('message_queue.proc_msg_log')}</span>
                        </div>
                      )}
                   </div>
                </div>
             </div>
           ) : (
             <div className="h-[400px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] flex flex-col items-center justify-center p-10 text-center">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-3xl flex items-center justify-center mb-6 text-slate-300 dark:text-slate-700">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="font-black text-slate-900 dark:text-slate-50 uppercase tracking-widest text-sm mb-2">{t('message_queue.inspector_title')}</h3>
                <p className="text-slate-400 text-sm max-w-[200px]">{t('message_queue.inspector_desc')}</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
