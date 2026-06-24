import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryIcon',
  standalone: true
})
export class CategoryIconPipe implements PipeTransform {
  private readonly iconMap: Record<string, string> = {
    'food': '🍔',
    'salary': '💰',
    'coffee': '☕',
    'groceries': '🛒',
    'rent': '🏠',
    'transport': '🚗',
    'freelance': '💻',
    'shopping': '🛍️',
    'health': '❤️',
    'entertainment': '🎬'
  };

  transform(value: string | null | undefined): string {
    if (!value) return '📄';

    const normalized = value.toLowerCase().trim();
    const icon = this.iconMap[normalized] || '📄';

    return `${icon} ${value}`;
  }
}
