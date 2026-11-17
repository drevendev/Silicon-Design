/* Original deterministic teaching models. No network, timers or presentation authority. */
(function (root) {
  'use strict';
  const names = [
    ['Copper wren', 'Медный крапивник'], ['Glass moth', 'Стеклянный мотылёк'],
    ['Paper moon', 'Бумажная луна'], ['Reed star', 'Тростниковая звезда'],
    ['Winter seed', 'Зимнее семечко']
  ];
  const clone = value => JSON.parse(JSON.stringify(value));
  function game() {
    return {format: 1, funds: 30, epoch: 0, offers: names.map((_, i) => ({id: 'copy-' + i, kind: i, revision: i === 1 ? 1 : 2, stock: 1, remaining: i === 1 ? 1 : 2})), draft: null, preview: null, accepted: [], hung: [], skipped: false};
  }
  function fact(copy, lang = 'en') {
    const ru = lang === 'ru', cost = 6 + copy.kind;
    const effect = copy.revision === 1 ? 2 : 3;
    return {id: copy.id, revision: copy.revision, cost, effect, remaining: copy.remaining,
      name: names[copy.kind][ru ? 1 : 0],
      short: ru ? `При подвешивании: +${effect} света · ${copy.remaining} примен.` : `When hung: +${effect} light · ${copy.remaining} uses`,
      full: ru ? `Редакция ${copy.revision}. Эффект +${effect} света фиксируется при принятии заказа и срабатывает при подвешивании. Осталось применений у этого экземпляра: ${copy.remaining}. Цена: ${cost}.` : `Revision ${copy.revision}. The +${effect} light effect is captured when this order is accepted and triggers when hung. This physical copy has ${copy.remaining} uses remaining. Price: ${cost}.`};
  }
  function restoreGame(raw) {
    try {
      const s = JSON.parse(raw), base = game();
      if (s?.format !== 1 || !Number.isInteger(s.funds) || s.funds < 0 || !Number.isInteger(s.epoch) || s.epoch < 0 || typeof s.skipped !== 'boolean') return null;
      if (!Array.isArray(s.offers) || s.offers.length !== base.offers.length || !Array.isArray(s.accepted) || !Array.isArray(s.hung)) return null;
      if (!s.offers.every((x, i) => x.id === base.offers[i].id && x.kind === i && [1,2].includes(x.revision) && Number.isInteger(x.stock) && x.stock >= 0 && Number.isInteger(x.remaining) && x.remaining >= 0)) return null;
      if (s.draft !== null && (!s.offers.some(x => x.id === s.draft?.id) || typeof s.draft.note !== 'string')) return null;
      if (s.preview !== null && (!s.draft || s.preview.id !== s.draft.id || !Number.isInteger(s.preview.epoch) || !Number.isInteger(s.preview.cost))) return null;
      if (!s.accepted.every((x, i) => x.id === 'accepted-' + (i+1) && x.copy && x.fact && x.copy.id === x.fact.id && x.fact.cost === fact(x.copy).cost && typeof x.note === 'string')) return null;
      if (!s.hung.every(id => s.accepted.some(x => x.id === id)) || new Set(s.hung).size !== s.hung.length) return null;
      return s;
    } catch { return null; }
  }
  function guide(s) { return s.skipped ? 'skipped' : s.hung.length ? 'done' : s.accepted.length ? 'hang' : s.preview ? 'confirm' : s.draft ? 'preview' : 'choose'; }
  function command(state, action) {
    const s = clone(state); let outcome = 'unchanged', event = null;
    if (action.type === 'choose' && s.offers.some(x => x.id === action.id)) { s.draft = {id: action.id, note: action.note || ''}; s.preview = null; outcome = 'draft'; }
    if (action.type === 'note' && s.draft) s.draft.note = action.note;
    if (action.type === 'preview' && s.draft) { const f = fact(s.offers.find(x => x.id === s.draft.id)); s.preview = {epoch: s.epoch, id: s.draft.id, cost: f.cost}; outcome = 'preview'; }
    if (action.type === 'cancel') { s.preview = null; outcome = 'cancelled'; }
    if (action.type === 'stock') { s.offers.find(x => x.id === action.id).stock = action.stock; s.epoch++; }
    if (action.type === 'commit' && s.preview && s.draft) {
      const item = s.offers.find(x => x.id === s.draft.id), f = fact(item);
      if (s.preview.epoch !== s.epoch || item.stock < 1 || s.funds < f.cost) outcome = 'refused';
      else {
        s.funds -= f.cost; item.stock--; s.epoch++;
        event = {id: 'accepted-' + (s.accepted.length + 1), copy: clone(item), fact: f, note: s.draft.note};
        s.accepted.push(event); s.preview = null; s.draft = null; outcome = 'accepted';
      }
    }
    if (action.type === 'hang') {
      const next = s.accepted.find(x => !s.hung.includes(x.id));
      if (next) { s.hung.push(next.id); next.copy.remaining--; s.offers.find(x=>x.id===next.copy.id).remaining=next.copy.remaining; outcome = 'hung'; event = {id: 'hung-' + next.id}; }
    }
    if (action.type === 'skip') s.skipped = true;
    return {state: s, outcome, event};
  }
  function desk() { return {format: 1, selected: 'A', scheduling: false, serial: 0, job: null, attempts: [], dismissed: [], config: 0, check: null, ready: false}; }
  const stages = ['preparing', 'processing', 'checking', 'saving'];
  function work(state, action) {
    const s = clone(state); let outcome = 'unchanged';
    if (action.type === 'select') s.selected = action.id;
    if (action.type === 'schedule') s.scheduling = action.enabled;
    if (action.type === 'start' && !s.job) { const scenario=action.scenario||'success';s.job = {id: ++s.serial, workspace: s.selected, stage: 'preparing', scenario, input:scenario==='no_inputs'?'':`Source ${s.selected}: Ёжик / river letter / ${s.serial}`}; outcome = 'started'; }
    if (action.type === 'pause' && s.job && s.job.stage !== 'stopping') { s.job.stage = 'stopping'; outcome = 'stopping'; }
    if (action.type === 'reply' && s.job && action.id === s.job.id) {
      if (s.job.stage === 'stopping') {
        if (action.stopped) { s.attempts.push({...s.job, result: 'stopped'}); s.job = null; outcome = 'stopped'; }
      } else if (action.stopped) { /* An unsolicited stop acknowledgement is not a stage reply. */
      } else if (s.job.stage === 'saving' || s.job.scenario === 'no_inputs') {
        const hasDraft=['success','draft','save_error'].includes(s.job.scenario);
        s.attempts.push({...s.job, result: s.job.scenario, draft:hasDraft?s.job.input+'\nReading copy · synthetic / Копия для чтения · симуляция':null, saved:s.job.scenario==='success'}); s.job = null; outcome = 'finished';
      } else s.job.stage = stages[stages.indexOf(s.job.stage) + 1];
    }
    if (action.type === 'dismiss' && !s.dismissed.includes(action.id)) s.dismissed.push(action.id);
    if (action.type === 'config') { s.config++; s.ready = false; }
    if (action.type === 'check') { s.check = {id: s.config, pending: true}; s.ready = false; }
    if (action.type === 'checked' && s.check?.pending) { s.ready = s.check.id === s.config; s.check.pending = false; outcome = s.ready ? 'ready' : 'stale'; }
    return {state: s, outcome};
  }
  const api = {game, restoreGame, fact, guide, command, desk, work};
  if (typeof module !== 'undefined') module.exports = api; else root.Decisions = api;
})(typeof window === 'undefined' ? globalThis : window);
