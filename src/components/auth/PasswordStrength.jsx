const rules = [
  { label: "8+ characters", test: (value) => value.length >= 8 },
  { label: "Uppercase", test: (value) => /[A-Z]/.test(value) },
  { label: "Number", test: (value) => /\d/.test(value) },
  { label: "Symbol", test: (value) => /[^A-Za-z0-9]/.test(value) }
];

export function PasswordStrength({ password = "" }) {
  const score = rules.filter((rule) => rule.test(password)).length;
  const widths = ["w-1/5", "w-1/4", "w-2/4", "w-3/4", "w-full"];
  const colors = ["bg-red-400", "bg-orange-400", "bg-accent", "bg-primary", "bg-success"];

  return (
    <div className="space-y-3">
      <div className="h-2 rounded-full bg-muted">
        <div className={`h-2 rounded-full transition-all ${widths[score]} ${colors[score]}`} />
      </div>
      <div className="flex flex-wrap gap-2">
        {rules.map((rule) => {
          const passed = rule.test(password);
          return (
            <span key={rule.label} className={`rounded-full px-3 py-1 text-xs font-semibold ${passed ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
              {rule.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
